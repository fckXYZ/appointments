import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from "react-toastify";

// data = [
// 	{
// 		"id": "622b0bf2a8fcd4c45f836998",
// 		"appointmentId": "622b0afea8fcd4c45f83695b",
// 		"name": "Observation",
// 		"resource": "Observation",
// 		"date": "2022-03-11T08:44:34.718000+00:00",
// 		"details": "Blood pressure",
// 		"values": [
// 			"120/80"
// 		],
// 		"code": "85354-9"
// 	}
// ]
class Events {
	data = [];
	detailedData = [];
	loading = false;
	dataDisplayed = 0;
	displayStep = 15;
	hasMoreData = true;
	error = null;

	constructor() {
		makeAutoObservable(this);
	}

	sortEvents(eventsList) {
		const sortedEvents = eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));

		let appointments = []
		let notAppointmentsWithApp = []
		let notAppointmentsWOApp = []

		sortedEvents.map((ev) => {
			if (ev.name === 'Appointment') {
				appointments.push(ev);
				return
			}
			if (ev.appointmentId) {
				notAppointmentsWithApp.push(ev)
				return
			}
			notAppointmentsWOApp.push(ev)
		})

		let finalSortedData = [];

		while (appointments.length) {

			const app = appointments[0];

			finalSortedData.push(app);

			const { id } = app;
			const arrToMerge = notAppointmentsWithApp.filter((el) => el.appointmentId === id);
			finalSortedData = finalSortedData.concat(arrToMerge);

			if (appointments[1]) {
				const arrWoAppToMerge = notAppointmentsWOApp.filter((el) => new Date(el.date) > new Date(appointments[1].date));
				finalSortedData = finalSortedData.concat(arrWoAppToMerge);
				notAppointmentsWOApp.splice(0, arrWoAppToMerge.length);
			} else {
				finalSortedData = finalSortedData.concat(notAppointmentsWOApp);
			}

			appointments.shift();
		}

		return finalSortedData.map((ev) => {
			if (
				(ev.name !== 'Appointment')
				&& (ev.appointmentId)
				&& (finalSortedData.indexOf(ev) !== 0)
				&& (finalSortedData[finalSortedData.indexOf(ev) - 1].name === ev.name)
			) {
				return {
					...ev,
					name: ''
				}
			} else {
				return ev
			}
		});

	}

	initEvents() {
		fetch('http://localhost:5010/events')
			.then((res) => res.json())
			.then((resData) => {
				const sortedEvents = this.sortEvents(resData.items);

				runInAction(() => {
					this.data = sortedEvents;
				})
				this.fillEventsData(this.dataDisplayed, this.dataDisplayed + this.displayStep);
			})
			.catch((e) => {
				toast.error('Error loading events!')
				runInAction(() => {
					this.error = e;
				})
			})
	}

	fillEventsData(countStart, countStop) {
		const ids = [];
		let lastRec;

		if (countStop >= this.data.length) {
			lastRec = this.data.length;
			this.hasMoreData = false;
		} else {
			lastRec = countStop
		}

		const dataToFill = this.data.slice(countStart, lastRec);
		dataToFill.map((ev) => {
			return ids.push(`${ev.resource}/${ev.id}`)
		});

		this.loading = true;
		fetch('http://localhost:5010/resources', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ids
			})
		})
			.then((res) => res.json())
			.then((resData) => {
				let dataToMergeArr = [];
				dataToFill.map((eventData) => {
					const newDataObj = resData.items.find((el) => {
						return el.id === `${eventData.resource}/${eventData.id}`
					});

					dataToMergeArr.push({
						...eventData,
						details: newDataObj.details || '',
						values: newDataObj.values,
						code: newDataObj.code || ''
					})
				})

				runInAction(() => {
					this.detailedData = this.detailedData.concat(dataToMergeArr);
					this.dataDisplayed = countStop;
				})
			})
			.catch((e) => {
				toast.error('Error loading data!')
				runInAction(() => {
					this.error = e;
				})
			})
			.finally(() => {
				if (!this.hasMoreData) {
					toast.warning('No more events!')
				}
				runInAction(() => {
					this.loading = false;
				})
			})
	}

	clearState() {
		this.data = [];
		this.detailedData = [];
		this.loading = false;
		this.dataDisplayed = 0;
		this.displayStep = 15;
		this.hasMoreData = true;
		this.error = null;
	}
}

export default new Events();
