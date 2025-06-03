import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Blog = () => {
	const { id } = useParams();
	const { posts, toast } = useAppContext();
	const [loading, setLoading] = useState(true);
	const [blogData, setBlogData] = useState(null);
	const [comment, setComment] = useState(""); // For future comment submission

	// Fetch blog data based on the blogId
	const fetchBlogData = useCallback(() => {
		setLoading(true);
		try {
			const post = Array.isArray(posts)
				? posts.find((post) => post._id === id)
				: null;
			if (post) {
				setBlogData({
					title: post.title,
					description: post.description,
					image: post.image,
					category: post.category,
					date: post.createdAt,
					comments: post.comments || [],
				});
			} else {
				setBlogData(null);
				toast.error("Blog not found.");
				console.error("Blog not found for ID:", id);
			}
		} catch (error) {
			console.error("Error fetching blog data:", error);
			toast.error("Failed to load blog data.");
			setBlogData(null);
		} finally {
			setLoading(false);
		}
	}, [id, posts, toast]);

	useEffect(() => {
		if (id) {
			fetchBlogData();
		}
	}, [id, posts, fetchBlogData]);

	return (
		<div className='pt-22 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100'>
			<main className='container mx-auto px-4 py-12 max-w-3xl'>
				{loading ? (
					<div className='flex justify-center items-center min-h-[40vh]'>
						<p className='text-indigo-600 text-lg font-medium animate-pulse'>
							Loading...
						</p>
					</div>
				) : blogData ? (
					<>
						<article className='bg-white rounded-3xl shadow-xl p-8 mb-12 border border-indigo-100 transition-all duration-300 hover:shadow-2xl'>
							<h1 className='text-4xl font-extrabold text-indigo-900 mb-4 tracking-tight'>
								{blogData.title}
							</h1>
							<div className='flex flex-col md:flex-row gap-8 mb-6'>
								{blogData.image && (
									<img
										src={blogData.image}
										alt={blogData.title}
										className='w-full md:w-2/5 h-72 object-cover rounded-3xl border-2 border-indigo-100 shadow-lg transition-transform duration-300 hover:scale-105'
									/>
								)}
								<div className='flex-1 flex flex-col justify-between'>
									<p className='text-gray-700 mb-6 text-lg leading-relaxed font-medium'>
										{/* Safely render HTML description */}
										<span
											dangerouslySetInnerHTML={{ __html: blogData.description }}
										/>
									</p>
									<div className='flex flex-wrap items-center gap-3'>
										<span className='inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-4 py-1 rounded-full shadow uppercase tracking-wider border border-indigo-100'>
											<svg
												className='w-4 h-4 text-indigo-400'
												fill='none'
												stroke='currentColor'
												strokeWidth='2'
												viewBox='0 0 20 20'
											>
												<path d='M4 10h12M10 4v12'></path>
											</svg>
											{blogData.category}
										</span>
										{blogData.date && (
											<span className='inline-flex items-center gap-1 text-indigo-600 text-xs bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100'>
												<svg
													className='w-4 h-4 text-indigo-400'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
													viewBox='0 0 20 20'
												>
													<rect
														x='3'
														y='4'
														width='14'
														height='12'
														rx='2'
													></rect>
													<path d='M16 2v4M4 2v4'></path>
												</svg>
												<span className='font-semibold'>Published:</span>
												{new Date(blogData.date).toLocaleDateString()}
											</span>
										)}
									</div>
								</div>
							</div>
						</article>

						<hr className='border-t border-indigo-100 mb-12' />

						<section className='bg-white rounded-2xl shadow-lg p-8 mb-10 border border-indigo-100'>
							<h2 className='text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2'>
								<svg
									className='w-6 h-6 text-indigo-400'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									viewBox='0 0 24 24'
								>
									<path d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7V7a4 4 0 10-8 0v2m12 0a4 4 0 01-8 0m8 0v2a4 4 0 01-8 0V9'></path>
								</svg>
								Comments
							</h2>
							<div className='space-y-6'>
								{blogData.comments && blogData.comments.length > 0 ? (
									blogData.comments.map((comment, idx) => (
										<div
											key={idx}
											className='bg-indigo-50 p-5 rounded-xl shadow-sm border border-indigo-100'
										>
											<p className='text-gray-800 text-base'>{comment.text}</p>
											<span className='text-xs text-gray-400 mt-2 block'>
												By{" "}
												<span className='font-semibold text-indigo-600'>
													{comment.user}
												</span>{" "}
												• {comment.date}
											</span>
										</div>
									))
								) : (
									<p className='text-gray-400 italic'>No comments yet.</p>
								)}
							</div>
						</section>

						<section className='bg-white rounded-2xl shadow-lg p-8 border border-indigo-100'>
							<h2 className='text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2'>
								<svg
									className='w-6 h-6 text-indigo-400'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									viewBox='0 0 24 24'
								>
									<path d='M12 20h9'></path>
									<path d='M12 4v16m0 0H3'></path>
								</svg>
								Add a Comment
							</h2>
							<form
								className='space-y-5'
								onSubmit={(e) => e.preventDefault()}
							>
								<textarea
									className='w-full p-4 border border-indigo-100 rounded-xl focus:ring-2 focus:ring-indigo-300 transition text-base resize-none'
									rows='4'
									placeholder='Write your comment here...'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								></textarea>
								<div className='flex justify-end'>
									<button
										type='submit'
										className='px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400'
										disabled={!comment.trim()}
									>
										Submit Comment
									</button>
								</div>
							</form>
						</section>
					</>
				) : (
					<div className='flex justify-center items-center min-h-[40vh]'>
						<p className='text-red-600 text-lg font-medium'>Blog not found.</p>
					</div>
				)}
			</main>
		</div>
	);
};

export default Blog;
