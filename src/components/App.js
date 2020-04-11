import React from 'react';

import EventList from './EventList';
import EventCreationForm from './EventCreationForm';
import { getEvents, removeEvent } from '../api/EventsAPI';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [{ name: 'Random event!', date: Date.now() + 86400000 }],
		};
	}

	handleEventsFromServer = async () => {
		const savedEvents = await getEvents();
		return savedEvents;
	};

	async componentDidMount() {
		const savedevents = await this.handleEventsFromServer();
		this.setState((previous) => ({
			events: [...previous.events, ...savedevents],
		}));
	}

	handleEventSubmission = (e) => {
		this.setState((prev) => ({
			events: [...prev.events, e],
		}));
	};

	deleteEvent = (id) => {
		removeEvent(id);
		const updatedState = this.state.events.filter((event) => {
			return event.id !== id;
		});
		this.setState({ events: updatedState });
	};

	render() {
		return (
			<div>
				<EventCreationForm addEvent={this.handleEventSubmission} />
				<EventList events={this.state.events} deleteEvent={this.deleteEvent} />
			</div>
		);
	}
}

export default App;
