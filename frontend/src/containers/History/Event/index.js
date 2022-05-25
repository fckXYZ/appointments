import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

const getColorByType = (type) => {
	switch (type) {
		case 'Observation':
			return '#8ee3fd';
		case 'Condition':
			return '#d2e9ac';
		case 'CarePlan':
			return '#e3b3ea';
		case 'Diagnosis':
			return '#f8dBd2';
		case 'Appointment':
			return '#b2baf9';
		case 'AllergyIntolerance':
			return '#f8b1d0';
		case 'MedicationStatement':
			return '#a7e7ce';
		default:
			return '#d0d0d0'
	}
}

const Event = ({ type, details, values, code, date }) => {

	const [valuesString, setValuesString] = useState('');

	useEffect(() => {
		if (values) {
			let valuesArr = [];
			values.map((val) => {
				if (typeof val === 'object') {
					valuesArr.push(Object.values(val).join(' '));
				} else {
					valuesArr.push(val)
				}
			})
			setValuesString(valuesArr.join(', '))
		}
	}, [values]);

	const valuesCropRef = useRef(null);

	useEffect(() => {
		if (valuesCropRef.current) {
			// eslint-disable-next-line no-undef
			$clamp(valuesCropRef.current, { clamp: 3 });
		}
	}, [valuesCropRef])

	return (
		<div className="event">
			<div className="event-td data type">
				{
					type && (
						<p className="main-text" style={{ backgroundColor: getColorByType(type) }}>
							{type}
						</p>
					)
				}
			</div>
			<div className="event-td details">
				<p className="main-text" ref={valuesCropRef}>
					{details}{valuesString && `: ${valuesString}`}
				</p>
			</div>
			<div className="event-td code">
				<p className="main-text">
					{code}
				</p>
			</div>
			<div className={`event-td date ${!type ? 'inactive' : ''}`}>
				<p className="main-text">
					{moment(date).format('MMM DD, YYYY')}
				</p>
			</div>
		</div>
	)
}

export default Event
