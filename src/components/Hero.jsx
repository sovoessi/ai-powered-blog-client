import React from "react";

const Hero = () => {

	const [searchQuery, setSearchQuery] = React.useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		const query = e.target.elements[0].value.trim();
		if (query) {
			// Redirect to search results page or handle search logic
			console.log("Search query:", query);
			// Example: window.location.href = `/search?query=${query}`;
		}
	}

	return (
		<section className='bg-white/80 rounded-2xl shadow p-8 mt-8 mx-auto max-w-4xl flex flex-col items-center text-center space-y-6'>
			<h1 className='text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-2'>
				Welcome to My Blog
			</h1>
			<p className='text-lg text-gray-600 mb-2'>
				Explore my latest posts and articles.
			</p>
			
			<form onSubmit={handleSearch} className='w-full max-w-md mx-auto mt-6 flex flex-col sm:flex-row gap-2'>
				<input
					type='text'
					placeholder='Search...'
					className='flex-1 px-4 py-2 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200'
				/>
				<button
					type='submit'
					className='px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition'
				>
					Search
				</button>
			</form>
		</section>
	);
};

export default Hero;
