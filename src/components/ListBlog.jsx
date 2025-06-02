import React from "react";
import Navbar from "./Navbar";

const blogs = [
	{ title: "Sample Blog Title", author: "Author Name" },
	{ title: "Another Blog", author: "Jane Doe" },
];

const latestBlogs = [
	{ title: "Blog Title 1", desc: "Short description of the blog post..." },
	{ title: "Blog Title 2", desc: "Short description of the blog post..." },
	{ title: "Blog Title 3", desc: "Short description of the blog post..." },
];

const ListBlog = () => {
	return (
		<>
			<Navbar />
			<div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8'>
				<div className='container mx-auto px-4'>
					<h1 className='text-3xl font-bold text-indigo-800 mb-6'>
						List of Blogs
					</h1>
					<div className='overflow-x-auto rounded-xl shadow mb-8 bg-white border border-indigo-100'>
						<table className='min-w-full divide-y divide-indigo-100'>
							<thead className='bg-indigo-50'>
								<tr>
									<th className='py-3 px-6 text-left text-sm font-semibold text-indigo-700'>
										Title
									</th>
									<th className='py-3 px-6 text-left text-sm font-semibold text-indigo-700'>
										Author
									</th>
									<th className='py-3 px-6 text-left text-sm font-semibold text-indigo-700'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{blogs.map((blog, idx) => (
									<tr
										key={idx}
										className='hover:bg-indigo-50 transition'
									>
										<td className='py-3 px-6 text-gray-800'>{blog.title}</td>
										<td className='py-3 px-6 text-gray-600'>{blog.author}</td>
										<td className='py-3 px-6'>
											<button className='text-blue-600 hover:underline mr-4 font-medium transition'>
												Edit
											</button>
											<button className='text-red-500 hover:underline font-medium transition'>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className='flex justify-end mb-12'>
						<button  className='px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition'>
							Add New Blog
						</button>
					</div>

					<section>
						<h2 className='text-2xl font-semibold text-indigo-700 mb-6'>
							Latest Blogs
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{latestBlogs.map((blog, idx) => (
								<div
									key={idx}
									className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-indigo-100'
								>
									<h3 className='text-lg font-semibold text-indigo-700 mb-2'>
										{blog.title}
									</h3>
									<p className='text-gray-600'>{blog.desc}</p>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default ListBlog;
