import React from "react";

const Comments = () => {
	return (
		<>
			<main className='pt-28 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8'>
				<div className='container mx-auto px-4'>
					<h1 className='text-3xl font-bold text-indigo-800 mb-6'>Comments</h1>
					<div className='bg-white rounded-lg shadow p-6'>
						<p className='text-gray-600'>
							No comments yet. Be the first to comment!
						</p>
					</div>
				</div>
			</main>
		</>
	);
};

export default Comments;
