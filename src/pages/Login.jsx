import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const {login } = useAppContext();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login(formData.email, formData.password);
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200'>
			<title>Login</title>
			<meta
				name='description'
				content='Login to your account'
			/>
			<meta
				name='keywords'
				content='login, user, account'
			/>
			<div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
				<div className='mb-8 text-center'>
					<h1 className='text-3xl font-bold text-indigo-700 mb-2'>
						Welcome Back!
					</h1>
					<p className='text-gray-500'>
						Please enter your credentials to login.
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-700 font-medium mb-1'
						>
							Email:
						</label>
						<input
							type='text'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>
					</div>
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-gray-700 font-medium mb-1'
						>
							Password:
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200'
					>
						Login
					</button>
				</form>
				<p className='mt-6 text-center text-gray-600'>
					Don't have an account?{" "}
					<a
						href='/register'
						className='text-indigo-600 hover:underline font-medium'
					>
						Register here
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
