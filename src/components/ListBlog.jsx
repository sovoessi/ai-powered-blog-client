import React, { useState } from "react";
import Navbar from "./Navbar";
import { useAppContext } from "../context/AppContext";
import EditBlogModal from "./EditBlogModal";

const ListBlog = () => {
	const {
		posts,
		loading,
		error,
		refreshPosts,
		navigate,
		updatePost,
		deletePost,
	} = useAppContext();

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedBlog, setSelectedBlog] = useState(null);
	const [editLoading, setEditLoading] = useState(false);

	const handleEditClick = (blog) => {
		setSelectedBlog(blog);
		setEditModalOpen(true);
	};

	const handleEditClose = () => {
		setEditModalOpen(false);
		setSelectedBlog(null);
	};

	const handleEditSave = async (updatedBlog) => {
		setEditLoading(true);
		await updatePost(updatedBlog._id, {
			title: updatedBlog.title,
			description: updatedBlog.desc || updatedBlog.description,
			category: updatedBlog.category,
			image: updatedBlog.image,
		});
		setEditLoading(false);
		handleEditClose();
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this blog?")) {
			deletePost(id);
		}
	};

	return (
		<>
			<EditBlogModal
				open={editModalOpen}
				onClose={handleEditClose}
				blog={selectedBlog}
				onSave={handleEditSave}
				loading={editLoading}
			/>
			<div className='pt-28 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8'>
				<div className='container mx-auto px-4'>
					<h1 className='text-3xl font-bold text-indigo-800 mb-6'>
						List of Blogs
					</h1>
					<div className='flex justify-end mb-4'>
						<button
							className='px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow transition'
							onClick={refreshPosts}
							disabled={loading}
						>
							{loading ? "Refreshing..." : "Refresh"}
						</button>
					</div>
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
								{loading ? (
									<tr>
										<td
											colSpan={3}
											className='py-6 text-center text-gray-400'
										>
											Loading...
										</td>
									</tr>
								) : error ? (
									<tr>
										<td
											colSpan={3}
											className='py-6 text-center text-red-500'
										>
											{error}
										</td>
									</tr>
								) : posts && posts.length > 0 ? (
									posts.map((blog, idx) => (
										<tr
											key={blog._id || idx}
											className='hover:bg-indigo-50 transition'
										>
											<td className='py-3 px-6 text-gray-800'>{blog.title}</td>
											<td className='py-3 px-6 text-gray-600'>
												{blog.author?.username ||
													blog.author?.name ||
													blog.author ||
													"Unknown"}
											</td>
											<td className='py-3 px-6'>
												<button
													className='text-blue-600 hover:underline mr-4 font-medium transition'
													onClick={() => handleEditClick(blog)}
												>
													Edit
												</button>
												<button
													className='text-red-500 hover:underline font-medium transition'
													onClick={() => handleDelete(blog._id)}
												>
													Delete
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={3}
											className='py-6 text-center text-gray-400'
										>
											No blogs available.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					<div className='flex justify-end mb-12'>
						<button
							onClick={() => navigate("/admin/add")}
							className='px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition'
						>
							Add New Blog
						</button>
					</div>
					<section>
						<h2 className='text-2xl font-semibold text-indigo-700 mb-6'>
							Latest Blogs
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{posts.map((blog, idx) => (
								<div
									key={idx}
									className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-indigo-100'
								>
									<h3 className='text-lg font-semibold text-indigo-700 mb-2'>
										{blog.title}
									</h3>
									<p className='text-gray-600'>
										{blog.desc || blog.description}
									</p>
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
