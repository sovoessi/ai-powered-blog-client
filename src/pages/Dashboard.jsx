import React from "react";
import Navbar from "../components/Navbar";

// Example BlogCard component for reusability and cleaner code
const BlogCard = ({ title, description }) => (
	<div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-indigo-100'>
		<h3 className='text-lg font-semibold text-indigo-700 mb-2'>{title}</h3>
		<p className='text-gray-600'>{description}</p>
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
	// Example data (replace with real data from API)
	const blogs = [
		{
			title: "Blog Title 1",
			description: "Short description of the blog post...",
		},
		{
			title: "Blog Title 2",
			description: "Short description of the blog post...",
		},
		{
			title: "Blog Title 3",
			description: "Short description of the blog post...",
		},
	];
	const comments = [
		{ comment: "This is a sample comment.", user: "User1" },
		{ comment: "This is another sample comment.", user: "User2" },
	];

	return (
		<>
			<main className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8'>
				<section className='container mx-auto px-4'>
					<h1 className='text-3xl font-bold text-indigo-800 mb-2'>Dashboard</h1>
					<p className='text-gray-500 mb-8'>Welcome to your dashboard!</p>
					<div className='bg-white rounded-2xl shadow p-6 mb-10 border border-indigo-100'>
						<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
							Admin Actions
						</h2>
						<ul className='flex flex-wrap gap-4'>
							<li>
								<a
									href='/add'
									className='inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition'
								>
									Add Blog Post
								</a>
							</li>
							<li>
								<a
									href='/list'
									className='inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition'
								>
									List Blog Posts
								</a>
							</li>
							<li>
								<a
									href='/comments'
									className='inline-block bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition'
								>
									Manage Comments
								</a>
							</li>
						</ul>
					</div>
				</section>

				<section className='container mx-auto px-4 mb-10'>
					<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
						Latest Blogs
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{blogs.map((blog, idx) => (
							<BlogCard
								key={idx}
								title={blog.title}
								description={blog.description}
							/>
						))}
					</div>
				</section>

				<section className='container mx-auto px-4'>
					<h2 className='text-xl font-semibold text-indigo-700 mb-4'>
						Latest Comments
					</h2>
					<div>
						{comments.map((c, idx) => (
							<CommentCard
								key={idx}
								comment={c.comment}
								user={c.user}
							/>
						))}
					</div>
				</section>
			</main>
		</>
	);
};

export default Dashboard;
