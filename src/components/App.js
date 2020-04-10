import React from 'react';

import EventList from './EventList';
import EventCreationForm from './EventCreationForm';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [{ name: 'Random event!', date: Date.now() + 86400000 }],
		};
	}

	handleEventSubmission = (e) => {
		if (e.date instanceof Date) {
			e.date = e.date.getTime();
		}
		this.setState((prev) => ({
			events: [...prev.events, e],
		}));
	};

	render() {
		return (
			<div>
				<EventCreationForm addEvent={this.handleEventSubmission} />
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
