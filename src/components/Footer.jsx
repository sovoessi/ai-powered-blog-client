import React from "react";

const Footer = () => {
	return (
		<footer className='bg-indigo-900 text-indigo-100 py-8 mt-8'>
			<div className='container mx-auto text-center'>
				<p className='text-sm mb-2'>
					© 2025 Your Company Name. All rights reserved.
				</p>
				<p className='text-sm'>
					Follow us on
					<a
						href='https://twitter.com'
						className='text-blue-300 hover:underline ml-1'
					>
						Twitter
					</a>
					,
					<a
						href='https://facebook.com'
						className='text-blue-300 hover:underline ml-1'
					>
						Facebook
					</a>
					, and
					<a
						href='https://instagram.com'
						className='text-blue-300 hover:underline ml-1'
					>
						Instagram
					</a>
					.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
