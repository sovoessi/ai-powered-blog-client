import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
	const { title, description, category, image, _id } = data;
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/blog/${_id}`);
	};
	return (
		<div className='flex flex-col items-center justify-center p-2'>
			<div
				onClick={handleClick}
				className='bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-indigo-100 group'
			>
				<img
					src={image}
					alt={title}
					className='w-full h-44 object-cover rounded-xl mb-4 border border-indigo-50 group-hover:scale-105 transition-transform duration-300'
				/>
				<h3 className='text-lg font-bold text-indigo-800 mb-2'>{title}</h3>
				<p className='text-gray-600 mb-2'>{description.slice(0, 80)}...</p>
				<span className='inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full'>
					{category}
				</span>
			</div>
		</div>
	);
};

export default Card;
