import { useState, useRef, useEffect } from "react";

import Quill from "quill";

const AddBlog = () => {
	// Initialize Quill editor
	const editorRef = useRef(null);
	const quillRef = useRef(null);

	const [form, setForm] = useState({
		title: "",
		description: "",
		category: "",
		image: "",
		isPublished: false,
	});
	const [success, setSuccess] = useState(false);
	const [isPublished, setIsPublished] = useState(true);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Dummy generateContent function to avoid errors
	const generateContent = () => {
		alert("AI content generation is not implemented yet.");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Add API call here
		setSuccess(true);
		setForm({
			title: "",
			description: "",
			category: "",
			image: "",
		});
		setTimeout(() => setSuccess(false), 2500);
	};

	useEffect(() => {
		// Cleanup Quill instance on unmount
		// Initialize Quill editor on component mount
	if (!quillRef.current && editorRef.current) {
		quillRef.current = new Quill(editorRef.current, {
			theme: "snow",
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					["bold", "italic", "underline"],
					["link", "image"],
					["clean"],
				],
			},
			formats: ["header", "bold", "italic", "underline", "link", "image"],
		});

		quillRef.current.on("text-change", () => {
			const content = quillRef.current.root.innerHTML;
			setForm((prev) => ({ ...prev, description: content }));
		});
	}
		return () => {
			if (quillRef.current) {
				quillRef.current = null;
			}
		};
	}, []);

	return (
		<section className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center py-12 px-4'>
			<div className='w-full max-w-xl bg-white/90 rounded-2xl shadow-lg p-8 border border-indigo-100'>
				<h2 className='text-2xl font-bold text-indigo-800 mb-6 text-center'>
					Add New Blog Post
				</h2>
				{success && (
					<div className='mb-4 text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center font-medium'>
						Blog post added successfully!
					</div>
				)}
				<form
					onSubmit={handleSubmit}
					className='space-y-5'
				>
					<div>
						<label
							htmlFor='title'
							className='block text-indigo-700 font-medium mb-1'
						>
							Title
						</label>
						<input
							type='text'
							id='title'
							name='title'
							value={form.title}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200 bg-white text-indigo-900'
							placeholder='Enter blog title'
						/>
					</div>
					<div>
						<label
							htmlFor='description'
							className='block text-indigo-700 font-medium mb-1'
						>
							Description
						</label>
						<div className='max-w-lg relative h-74 pb-16 sm:pb-10 pt-2'>
							<div
								ref={editorRef}
								className='quill-editor h-full bg-white rounded-lg border border-indigo-100'
							></div>
							<button
								type='button'
								className='absolute bottom-1 right-2 ml-2 text-xs bg-black/70 text-white  px-4 py-1.5 rounded hover:underline cursor-pointer 
								hover:bg-white text-indigo-600 hover:text-indigo-700 font-medium text-sm mb-2'
								onClick={generateContent}
							>
								Generate with AI
							</button>
						</div>
						{/* <textarea
							id='description'
							name='description'
							value={form.description}
							onChange={handleChange}
							required
							rows={4}
							className='w-full px-4 py-2 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200 bg-white text-indigo-900'
							placeholder='Write a short description...'
						></textarea> */}
					</div>
					<div>
						<label
							htmlFor='category'
							className='block text-indigo-700 font-medium mb-1'
						>
							Category
						</label>
						<select
							id='category'
							name='category'
							value={form.category}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200 bg-white text-indigo-900'
						>
							<option value=''>Select a category</option>
							<option value='Technology'>Technology</option>
							<option value='Health'>Health</option>
							<option value='Lifestyle'>Lifestyle</option>
							<option value='Travel'>Travel</option>
							<option value='Business'>Business</option>
							<option value='Education'>Education</option>
						</select>
					</div>
					{/* <div>
						<label
							htmlFor='image'
							className='block text-indigo-700 font-medium mb-1'
						>
							Image URL
						</label>
						<input
							type='url'
							id='image'
							name='image'
							value={form.image}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200 bg-white text-indigo-900'
							placeholder='https://example.com/image.jpg'
						/>
					</div> */}

					{/* <p className='text-sm text-indigo-600 mt-2'>Upload thumbnail </p>
						<input
							type='file'
							id='thumbnail'
							name='thumbnail'
							accept='image/*'
							className='w-full mt-2 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200 bg-white text-indigo-900'
					
							onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
						/> */}

					{/* Thumbnail Upload */}
					<div>
						<label
							htmlFor='thumbnail'
							className='block text-indigo-700 font-medium mb-1'
						>
							Thumbnail{" "}
							<span className='text-indigo-400 font-normal text-sm'>
								(optional)
							</span>
						</label>
						<div className='flex items-center gap-4'>
							<label
								htmlFor='thumbnail'
								className='flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg cursor-pointer hover:bg-indigo-100 transition text-indigo-700 font-medium shadow-sm'
							>
								<svg
									className='w-5 h-5 mr-2 text-indigo-400'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75M12 17v-6m0 0l-2 2m2-2l2 2'
									/>
								</svg>
								<span>Choose file</span>
								<input
									type='file'
									id='thumbnail'
									name='thumbnail'
									accept='image/*'
									className='hidden'
									onChange={(e) =>
										setForm({ ...form, image: e.target.files[0] })
									}
								/>
							</label>
							{form.image && (
								<span className='text-sm text-indigo-600 truncate max-w-[160px]'>
									{typeof form.image === "string"
										? form.image
										: form.image.name}
								</span>
							)}
						</div>
						<p className='text-xs text-gray-400 mt-1'>
							Accepted formats: JPG, PNG, GIF. Max size: 2MB.
						</p>
					</div>
					<div className='flex items-center justify-between'>
						<p className='text-sm text-indigo-600'>Publish now</p>
						<label className='inline-flex items-center'>
							<input
								type='checkbox'
								name='publish'
								className='form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
								onChange={handleChange}
								checked={isPublished}
							/>
							<span className='ml-2 text-sm text-gray-700'>Yes</span>
						</label>
					</div>
					<button
						type='submit'
						className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition'
					>
						Add Blog Post
					</button>
				</form>
			</div>
		</section>
	);
};

export default AddBlog;
