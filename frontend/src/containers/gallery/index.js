import React, { useEffect, useState } from "react";
import { MY_LIST } from "../../common/MyConstants";
import { useHistory, useParams } from "react-router";
import { HOME_PATH } from "../../common/routerConstants";
import Spinner from "../../components/Spinner";

const Gallery = (props) => {
	const { id } = useParams();
	const history = useHistory();

	const [imgs, setImgs] = useState(null);
	const [title, setTitle] = useState('');

	useEffect(() => {
		const neededDataObj = MY_LIST.find((item) => {
			return item.id === id
		});
		if (!neededDataObj) {
			history.push(HOME_PATH);
		}
		setTitle(neededDataObj.name);
		setImgs(neededDataObj.imgs);
	}, [])

	const renderImgs = () => {
		if (!imgs || !imgs.length) {
			return <Spinner />
		}
		return imgs.map((img) => (
			<div className="image-wrapper" key={`image-wrapper-${imgs.indexOf(img)}`}>
				<img src={img} alt={title} />
			</div>
		))
	}

	return (
		<section className="gallery page">
			<h1 className="title">
				{title}
			</h1>
			<div className="images-wrapper">
				{renderImgs()}
			</div>
		</section>
	)
}

export default Gallery
