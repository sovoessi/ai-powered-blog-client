import React from "react";
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


import "quill/dist/quill.snow.css";

const App = () => {
	return (
		<>
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
					element={true ? <Dashboard /> : <Login />}
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
