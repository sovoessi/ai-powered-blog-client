import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const API_URL = import.meta.env.VITE_API_URL;

	// Fetch all posts from the server
	const fetchPosts = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get(`${API_URL}/posts`);
			setPosts(response.data);
		} catch (err) {
			setError(err.message);
			toast("Failed to fetch posts.");
		} finally {
			setLoading(false);
		}
	};

	// Refresh posts: always fetch latest from server, reset error/loading
	const refreshPosts = async () => {
		await fetchPosts();
	};

	// Create a new post
	const createPost = async (postData) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("title", postData.title);
			formData.append("description", postData.description);
			formData.append("category", postData.category);
			formData.append("isPublished", postData.isPublished);

			// Only append image if it's a File (not a string)
			if (postData.image && typeof postData.image !== "string") {
				formData.append("image", postData.image);
			}

			const response = await axios.post(`${API_URL}/posts`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});
			setPosts((prevPosts) => [...prevPosts, response.data]);
			toast("Post created successfully!");
			navigate("/admin");
		} catch (err) {
			setError(err.message);
			// Check for invalid/expired token
			if (
				err.response &&
				(err.response.status === 401 || err.response.status === 403)
			) {
				toast("Session expired or unauthorized. Please log in again.");
				handleLogout(); // Optionally log out the user
			} else {
				toast("Failed to create post.");
			}
		} finally {
			setLoading(false);
		}
	};

	// Update an existing post
	const updatePost = async (id, postData) => {
		setLoading(true);
		try {
			const response = await axios.put(`${API_URL}/posts/${id}`, postData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setPosts((prevPosts) =>
				prevPosts.map((post) => (post._id === id ? response.data : post))
			);
			toast.success("Post updated successfully!");
			navigate("/list");
		} catch (err) {
			setError(err.message);
			toast.error("Failed to update post.");
		} finally {
			setLoading(false);
		}
	};

	// Delete a post
	const deletePost = async (id) => {
		setLoading(true);
		try {
			await axios.delete(`${API_URL}/posts/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
			toast.success("Post deleted successfully!");
		} catch (err) {
			setError(err.message);
			toast.error("Failed to delete post.");
		} finally {
			setLoading(false);
		}
	};

	// Handle user login
	const login = async (email, password) => {
		setLoading(true);
		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
			});
			handleLogin(response.data);
		} catch (err) {
			setError(err.message);
			toast("Login failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};

	// Handle user registration
	const register = async (username, email, password) => {
		setLoading(true);
		try {
			const response = await axios.post(`${API_URL}/auth/register`, {
				username,
				email,
				password,
			});
			handleLogin(response.data);
		} catch (err) {
			setError(err.message);
			toast.error("Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Handle user login
	const handleLogin = (userData) => {
		setToken(userData.token);
		setUser(userData.user);
		sessionStorage.setItem("token", userData.token);
		sessionStorage.setItem("user", JSON.stringify(userData.user));
		navigate("/admin");
		toast("Logged in successfully!");
	};

	// Handle user logout
	const handleLogout = () => {
		setToken(null);
		setUser(null);
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		navigate("/");
		toast("Logged out successfully!");
	};

	// Fetch token from session storage on initial load
	useEffect(() => {
		const storedToken = sessionStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	// Fetch user from session storage on initial load
	useEffect(() => {
		const storedUser = sessionStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		fetchPosts();
	}, []);

	const contextValue = {
		posts,
		error,
		loading,
		navigate,
		token,
		user,
		toast,
		fetchPosts,
        refreshPosts,
		createPost,
		updatePost,
		deletePost,
		login,
		register,
		handleLogout,
	};

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};
