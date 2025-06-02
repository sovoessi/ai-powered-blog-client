import React from "react";
import Card from "./Card";
const CardList = () => {
	const data = [
		{
			title: "Sample Blog Post 1",
			description: "This is a sample description for blog post 1.",
			category: "Technology",
			image: "https://via.placeholder.com/150",
			_id: "1",
		},
		{
			title: "Sample Blog Post 2",
			description: "This is a sample description for blog post 2.",
			category: "Health",
			image: "https://via.placeholder.com/150",
			_id: "2",
		},
		{
			title: "Sample Blog Post 3",
			description: "This is a sample description for blog post 3.",
			category: "Lifestyle",
			image: "https://via.placeholder.com/150",
			_id: "3",
		},
		{
			title: "Sample Blog Post 4",
			description: "This is a sample description for blog post 4.",
			category: "Travel",
			image: "https://via.placeholder.com/150",
			_id: "4",
		},
		{
			title: "Sample Blog Post 5",
			description: "This is a sample description for blog post 5.",
			category: "Business",
			image: "https://via.placeholder.com/150",
			_id: "5",
		},
		{
			title: "Sample Blog Post 6",
			description: "This is a sample description for blog post 6.",
			category: "Education",
			image: "https://via.placeholder.com/150",
			_id: "6",
		},
	];
	const blogCategories = [
		"All",
		"Business",
		"Technology",
		"Health",
		"Lifestyle",
		"Travel",
		"Education",
	];
	const [selectedCategory, setSelectedCategory] = React.useState("All");
	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const cardList = data
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
				{blogCategories.map((category) => (
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
