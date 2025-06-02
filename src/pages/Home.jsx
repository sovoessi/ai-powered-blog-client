import React from "react";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import Newsletter from "../components/Newsletter";

// Add a subtle background and spacing for a clean, modern look
const Home = () => {
	return (
		<>
			<main className='flex-1 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 pt-20'>
				<Hero />
				<section className='container mx-auto px-4 py-8'>
					<CardList />
				</section>
				<Newsletter />
			</main>
		</>
	);
};

export default Home;
