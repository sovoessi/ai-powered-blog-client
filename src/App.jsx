import { useAppContext } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./components/AddBlog";
import ListBlog from "./components/ListBlog";
import Comments from "./components/Comments";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


import "quill/dist/quill.snow.css";

const App = () => {


	const {user} = useAppContext();

	return (
		<>
		<ToastContainer/>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/blog/:id'
					element={<Blog />}
				/>
				<Route
					path='/admin'
					element={user ? <Dashboard /> : <Login />}
				/>
				<Route
					path='/add'
					element={<AddBlog />}
				/>
				<Route
					path='/list'
					element={<ListBlog />}
				/>
				<Route
					path='/comments'
					element={<Comments />}
				/>
			</Routes>
			<Footer />
		</>
	);
};

export default App;
