import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { useMemo } from "react";

// Safely truncate and render HTML
const getTruncatedHtml = (html, maxLength = 100) => {
	const div = document.createElement("div");
	div.innerHTML = html;
	const text = div.textContent || div.innerText || "";
	const truncated =
		text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
	return { __html: truncated };
};

// Example BlogCard component for reusability and cleaner code
const BlogCard = ({ title, description }) => (
	<div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-indigo-100 flex flex-col h-full'>
		<h3 className='text-lg font-semibold text-indigo-700 mb-2 truncate'>
			{title}
		</h3>
		<p className='text-gray-600 flex-1 mb-2 min-h-[3em]'>
			<span dangerouslySetInnerHTML={getTruncatedHtml(description, 100)} />
		</p>
	</div>
);

// Example CommentCard component
const CommentCard = ({ comment, user }) => (
	<div className='bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-50 mb-3'>
		<p className='text-gray-700'>{comment}</p>
		<p className='text-xs text-gray-400 mt-1'>Posted by {user}</p>
	</div>
);

const Dashboard = () => {
	const { posts, loading, error, fetchPosts } = useAppContext();

	const blogs = useMemo(
		() =>
			(posts || []).slice(0, 3).map((post) => ({
				title: post.title,
				description: post.description || "No description available.",
			})),
		[posts]
	);

	const comments = [
		{ comment: "This is a sample comment.", user: "User1" },
		{ comment: "This is another sample comment.", user: "User2" },
	];

	return (
		<>
			<main className='pt-28 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8'>
				<section className='container mx-auto px-4'>
					<h1 className='text-3xl font-bold text-indigo-800 mb-2'>Dashboard</h1>
					<p className='text-gray-500 mb-8'>Welcome to your dashboard!</p>
					<div className='bg-white rounded-2xl shadow p-6 mb-10 border border-indigo-100'>
						<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
							Admin Actions
						</h2>
						<ul className='flex flex-wrap gap-4'>
							<li>
								<Link
									to='/admin/add'
									className='inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition'
								>
									Add Blog Post
								</Link>
							</li>
							<li>
								<Link
									to='/admin/list'
									className='inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition'
								>
									List Blog Posts
								</Link>
							</li>
							<li>
								<Link
									to='/admin/comments'
									className='inline-block bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition'
								>
									Manage Comments
								</Link>
							</li>
							<li>
								<button
									onClick={fetchPosts}
									className='inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition'
									disabled={loading}
								>
									{loading ? "Refreshing..." : "Refresh Posts"}
								</button>
							</li>
						</ul>
						{error && <p className='text-red-500 mt-2'>{error}</p>}
					</div>
				</section>
				<section className='container mx-auto px-4 mb-10'>
					<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
						Latest Blogs
					</h2>
					{loading ? (
						<p className='text-gray-400'>Loading blogs...</p>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{blogs.length > 0 ? (
								blogs.map((blog, idx) => (
									<BlogCard
										key={idx}
										title={blog.title}
										description={blog.description}
									/>
								))
							) : (
								<p className='text-gray-400 col-span-full'>
									No blogs available.
								</p>
							)}
						</div>
					)}
				</section>
				<section className='container mx-auto px-4'>
					<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
						Latest Comments
					</h2>
					<div>
						{comments.length > 0 ? (
							comments.map((c, idx) => (
								<CommentCard
									key={idx}
									comment={c.comment}
									user={c.user}
								/>
							))
						) : (
							<p className='text-gray-400'>No comments available.</p>
						)}
					</div>
				</section>
			</main>
		</>
	);
};

export default Dashboard;
