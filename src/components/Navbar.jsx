import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const handleNavigation = (path) => {
		navigate(path);
	};

	return (
		<nav className='bg-white/90 px-4 sm:px-10 xl:px-32 py-4 shadow-md backdrop-blur-lg fixed w-full z-50'>
			<div className='flex justify-between items-center'>
				<a
					href='/'
					className='text-2xl font-bold text-indigo-700 hover:underline'
				>
					My Blog
				</a>
				<div className='flex gap-8 text-lg font-semibold'>
					<a
						href='/'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						Home
					</a>
					<a
						href='/blog'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						Blog
					</a>
					<a
						href='/about'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						About
					</a>
					<a
						href='/contact'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						Contact
					</a>
				</div>
				<button
					onClick={() => handleNavigation("/admin")}
					className='bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition'
				>
					Login
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
