import React from "react";
import { Link } from "react-router-dom";
import { GALLERY_PATH } from "../../common/routerConstants";

const Item = ({ id, name, cover, description, perks, stack, link }) => {
	return (
		<div className="item">
			<div className="image-wrapper">
				<img src={cover} alt={name}/>
			</div>
			<h5 className="title">
				{name}
			</h5>
			<p className="main-text description">
				{description}
			</p>
			<dev className="perks-block">
				<h4 className="perks-title">Details</h4>
				<ul className="perks">
					{perks.map((perk) => (
						<p className="main-text-smaller">{perk}</p>
					))}
				</ul>
			</dev>
			<dev className="stack-block">
				<h4 className="perks-title">Tech</h4>
				<ul className="perks">
					{stack.map((s) => (
						<p className="main-text-smaller">{s}</p>
					))}
				</ul>
			</dev>
			<div className="btns-block">
				<Link to={GALLERY_PATH.replace(':id', id)}>
					<button className="btn-more">Gallery</button>
				</Link>
				<a href={link} target="_blank" rel="noreferrer">
					<button className="btn-link">Link</button>
				</a>
			</div>
		</div>
	)
}

export default Item
