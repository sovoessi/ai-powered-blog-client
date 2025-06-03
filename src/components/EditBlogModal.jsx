import React, { useState, useEffect } from "react";

const EditBlogModal = ({ open, onClose, blog, onSave, loading }) => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		if (blog) {
			setTitle(blog.title || "");
			setDesc(blog.desc || blog.description || "");
			setCategory(blog.category || "");
		}
	}, [blog]);

	if (!open) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({ ...blog, title, desc, category });
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
			<div className='bg-white rounded-xl shadow-lg w-full max-w-lg p-8 relative'>
				<button
					className='absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl'
					onClick={onClose}
					aria-label='Close'
				>
					&times;
				</button>
				<h2 className='text-2xl font-bold mb-6 text-indigo-700'>Edit Blog</h2>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Title
						</label>
						<input
							type='text'
							className='w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Description
						</label>
						<textarea
							className='w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							rows={5}
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Category
						</label>
						<input
							type='text'
							className='w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
						/>
					</div>
					<div className='flex justify-end gap-3'>
						<button
							type='button'
							className='px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300'
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							type='submit'
							className='px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition'
							disabled={loading}
						>
							{loading ? "Saving..." : "Save"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditBlogModal;
