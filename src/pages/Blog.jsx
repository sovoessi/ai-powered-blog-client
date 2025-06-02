import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Blog = () => {
	const { id } = useParams(); // Destructure for clarity
	const [blogData, setBlogData] = useState(null);

	// Fetch blog data based on the blogId
	const fetchBlogData = async () => {
		const data = await fetch(`/api/blogs/${id}`); // Adjust the API endpoint as needed
		const result = await data.json();
		setBlogData(result);
	};

	useEffect(() => {
		if (id) {
			fetchBlogData();
		}
		// eslint-disable-next-line
	}, [id]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100'>
			<main className='container mx-auto px-4 py-8'>
				{blogData ? (
					<>
						<article className='bg-white rounded-2xl shadow p-6 mb-10 border border-indigo-100'>
							<h1 className='text-3xl font-bold text-indigo-800 mb-2'>
								{blogData.title}
							</h1>
							<div className='flex flex-col md:flex-row gap-6 mb-4'>
								{blogData.image && (
									<img
										src={blogData.image}
										alt={blogData.title}
										className='w-full md:w-1/2 h-64 object-cover rounded-xl border border-indigo-50 shadow'
									/>
								)}
								<div className='flex-1 flex flex-col justify-between'>
									<p className='text-gray-700 mb-4'>{blogData.description}</p>
									<div className='flex items-center gap-4'>
										<span className='inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full'>
											{blogData.category}
										</span>
										<span className='text-gray-400 text-xs'>
											{/* Example: Published date */}
											{blogData.date ? `Published: ${blogData.date}` : ""}
										</span>
									</div>
								</div>
							</div>
						</article>

						<section className='bg-white rounded-2xl shadow p-6 mb-10 border border-indigo-100'>
							<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
								Comments
							</h2>
							{/* Example comments, replace with real data */}
							<div className='space-y-4'>
								{blogData.comments && blogData.comments.length > 0 ? (
									blogData.comments.map((comment, idx) => (
										<div
											key={idx}
											className='bg-indigo-50 p-4 rounded-lg shadow-sm'
										>
											<p className='text-gray-700'>{comment.text}</p>
											<span className='text-xs text-gray-400 mt-1 block'>
												By {comment.user} • {comment.date}
											</span>
										</div>
									))
								) : (
									<p className='text-gray-400'>No comments yet.</p>
								)}
							</div>
						</section>

						<section className='bg-white rounded-2xl shadow p-6 mb-10 border border-indigo-100'>
							<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
								Add a Comment
							</h2>
							<form className='space-y-4'>
								<textarea
									className='w-full p-3 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200 transition'
									rows='4'
									placeholder='Write your comment here...'
								></textarea>
								<div className='flex justify-end'>
									<button
										type='submit'
										className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition'
									>
										Submit Comment
									</button>
								</div>
							</form>
						</section>
					</>
				) : (
					<div className='flex justify-center items-center min-h-[40vh]'>
						<p className='text-indigo-600 text-lg font-medium animate-pulse'>
							Loading...
						</p>
					</div>
				)}
			</main>
		</div>
	);
};

export default Blog;
