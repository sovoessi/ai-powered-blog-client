import React from "react";

const Newsletter = () => {
	return (
		<section className='bg-white/80 rounded-2xl shadow p-8 max-w-lg mx-auto mt-12 mb-8'>
			<h2 className='text-2xl font-bold text-indigo-800 mb-2'>
				Subscribe to our Newsletter
			</h2>
			<p className='mb-4 text-gray-600'>
				Stay updated with the latest news and articles.
			</p>
			<form className='flex flex-col sm:flex-row items-center gap-2'>
				<input
					type='email'
					placeholder='Enter your email'
					className='flex-1 p-3 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200'
					required
				/>
				<button
					type='submit'
					className='bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition'
				>
					Subscribe
				</button>
			</form>
		</section>
	);
};

export default Newsletter;
