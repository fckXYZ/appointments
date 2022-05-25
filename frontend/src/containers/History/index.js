import React, { useCallback, useEffect, useRef } from "react";
import events from "../../store/events";
import { observer } from "mobx-react-lite";
import Event from "./Event";
import Spinner from "../../components/Spinner";

const History = observer(() => {

	const observer = useRef(null);

	const lastItemRef = useCallback(
		(node) => {
			if (events.loading) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {

				if (entries[0].isIntersecting && events.hasMoreData && !events.error) {
					events.fillEventsData(events.dataDisplayed, events.dataDisplayed + events.displayStep);
				}
			});

			if (node) observer.current.observe(node);
		}, [events.loading, events.hasMoreData, events.error]);

	useEffect(() => {
		events.initEvents();

		return () => {
			events.clearState();
		}
	}, []);

	const renderEvents = () => {
		if (!events.detailedData) {
			return <Spinner />;
		}

		return (
			<ul className="events-list">
				<li className="events-item events-header">
					<span className="data events-title">Event type</span>
					<span className="details events-title">Details</span>
					<span className="code events-title">Code</span>
					<span className="date events-title">Date</span>
				</li>
				{events.detailedData.map((ev) => {
					const { id, name, details, values, code, date } = ev;
					const isLastItem = events.detailedData.indexOf(ev) === events.detailedData.length - 1;

					return (
						<li
							className={`events-item ${name ? '' : 'stacked'}`}
						    key={`event-item-${id}`}
							ref={isLastItem ? lastItemRef : null}
						>
							<Event
								type={name}
								details={details}
								values={values}
								code={code}
								date={date}
							/>
						</li>
					)
				})}
			</ul>
		)
	}

	return (
		<section className="history page">
			<h1 className="title">
				History
			</h1>
			<div className="events-block">
				{renderEvents()}
				<div className="loading-trigger">
					{events.loading && <Spinner />}
				</div>
			</div>
		</section>
	)
})

export default History
