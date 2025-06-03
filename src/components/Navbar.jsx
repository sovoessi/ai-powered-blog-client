import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const ProfileIcon = ({ className = "" }) => (
	<svg
		className={className}
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={1.5}
		stroke='currentColor'
		width={28}
		height={28}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z'
		/>
	</svg>
);

const Navbar = () => {
	const { user, handleLogout } = useAppContext();
	const navigate = useNavigate();

	const handleNavigation = (path) => {
		navigate(path);
	};

	return (
		<nav className='bg-white/90 px-4 sm:px-10 xl:px-32 py-4 shadow-md backdrop-blur-lg fixed w-full z-50'>
			<div className='flex justify-between items-center'>
				<Link
					to='/'
					className='text-2xl font-bold text-indigo-700 hover:underline'
				>
					My Blog
				</Link>
				<div className='flex gap-8 text-lg font-semibold'>
					<Link
						to='/'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						Home
					</Link>
					<Link
						to='/blog'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						Blog
					</Link>
					<Link
						to='/about'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						About
					</Link>
					<Link
						to='/contact'
						className='text-indigo-700 hover:text-indigo-900 transition'
					>
						Contact
					</Link>
				</div>
				{user ? (
					<div className='flex items-center gap-4'>
						<button
							onClick={() => handleNavigation("/admin")}
							className='flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition group'
							title='Go to profile'
						>
							<ProfileIcon className='text-indigo-600 group-hover:text-indigo-800 transition' />
							<span className='text-indigo-700 font-semibold'>
								{user.username}
							</span>
						</button>
						<button
							onClick={handleLogout}
							className='bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-red-600 transition'
							title='Logout'
						>
							Logout
						</button>
					</div>
				) : (
					<button
						onClick={() => handleNavigation("/admin")}
						className='bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-indigo-700 transition'
					>
						Login
					</button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
