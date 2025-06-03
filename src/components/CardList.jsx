import React from "react";
import Card from "./Card";

import { useAppContext } from "../context/AppContext";

const CardList = () => {
	const { posts } = useAppContext();

	const categories = ["All", ...new Set(posts.map((item) => item.category))];

	const [selectedCategory, setSelectedCategory] = React.useState("All");
	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const cardList = posts
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		.filter((item) => {
			if (selectedCategory === "All") {
				return true;
			}
			return item.category === selectedCategory;
		})
		.map((item) => (
			<Card
				key={item._id}
				data={item}
			/>
		));

	return (
		<div>
			<div className='flex flex-wrap justify-center gap-3 sm:gap-5 my-8'>
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => handleCategoryChange(category)}
						className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 shadow-sm border
                            ${
															selectedCategory === category
																? "bg-indigo-600 text-white border-indigo-600"
																: "bg-white text-indigo-700 border-indigo-100 hover:bg-indigo-50"
														}`}
					>
						{category}
					</button>
				))}
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{cardList}
			</div>
		</div>
	);
};

export default CardList;
