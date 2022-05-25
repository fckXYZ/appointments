import React from "react";
import Item from "./Item";
import { MY_LIST } from "../../common/MyConstants";


const Home = (props) => {

	const renderItems = () => {
	return MY_LIST.map((item) => {
		const { id, name, cover, description, perks, stack, link } = item;

		return (
			<li className="my-item" key={`my-item-${MY_LIST.indexOf(item)}`}>
				<Item
					id={id}
					name={name}
					cover={cover}
					description={description}
					perks={perks}
					stack={stack}
					link={link}
				/>
			</li>
		)
	})
	}

	return (
		<section className="home page">
			<h1 className="title">
				Home
			</h1>
			<div className="my-container">
				<ul className="my-list">
					{renderItems()}
				</ul>
			</div>
		</section>
	)
}

export default Home
