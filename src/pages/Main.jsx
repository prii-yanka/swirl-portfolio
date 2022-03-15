import React from 'react';
import './main.css'
import { Contact, Education, Experience, InteractiveGrid, Intro, Portfolio, Skills } from './';

const Main = () => (
	<main className="parts">
		<InteractiveGrid />
		<Intro />
		<Education />
		<Experience />
		<Skills />
		<Portfolio />
		<Contact />
	</main>
);

export default Main;