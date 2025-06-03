import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
	const {
		title = "",
		description = "",
		category = "",
		image = "",
		_id,
	} = data || {};
	const navigate = useNavigate();

	const handleClick = () => {
		if (_id) {
			navigate(`/blog/${_id}`);
		}
	};

	// Truncate and render HTML safely
	const getTruncatedHtml = (html, maxLength = 80) => {
		const div = document.createElement("div");
		div.innerHTML = html;
		const text = div.textContent || div.innerText || "";
		const truncated =
			text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
		return { __html: truncated };
	};

	return (
		<div className='flex flex-col items-stretch justify-between p-2 h-full'>
			<div
				onClick={handleClick}
				className='flex flex-col h-full bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-indigo-100 group focus:outline-none'
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") handleClick();
				}}
				aria-label={`Read blog post: ${title}`}
				style={{ minWidth: "0" }}
			>
				<div className='w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden border border-indigo-50 bg-indigo-50 flex items-center justify-center'>
					<img
						src={image || "/placeholder.jpg"}
						alt={title || "Blog thumbnail"}
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
						loading='lazy'
						style={{ display: "block" }}
						draggable={false}
					/>
				</div>
				<h3 className='text-lg font-bold text-indigo-800 mb-2 truncate'>
					{title}
				</h3>
				<p className='text-gray-600 mb-3 min-h-[2.5em]'>
					<span dangerouslySetInnerHTML={getTruncatedHtml(description, 80)} />
				</p>
				{category && (
					<span className='inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full mt-auto'>
						{category}
					</span>
				)}
			</div>
		</div>
	);
};

export default Card;
