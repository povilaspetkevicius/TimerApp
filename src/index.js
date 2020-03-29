import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Event {
	date = new Date();

	constructor(name, date) {
		this.name = name;
		this.date = date;
	}
}

function createFromDateTimeString(dateString, timeString) {
	const date = new Date();
	date.setFullYear(
		dateString.substring(0, 4),
		parseInt(dateString.substring(5, 7)) - 1,
		dateString.substring(8, 10),
	);
	if (timeString) {
		date.setHours(timeString.substring(0, 2), timeString.substring(3, 5));
	}
	return date;
}

class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: this.props.events,
		};
		this.eventListToDisplay = [];
	}

	componentDidUpdate(previousProps) {
		if (previousProps !== this.props) {
			this.updateList(this.props.events);
		}
	}

	updateList = updatedEvents => {
		this.eventListToDisplay = updatedEvents.map((ue, index) => (
			<li key={index}>{JSON.stringify(ue)}</li>
		));
		this.setState({
			events: updatedEvents,
		});
	};

	render() {
		return <ul>{this.eventListToDisplay}</ul>;
	}
}

class DatePicker extends React.Component {
	handleChange(event) {
		this.props.onChange({
			type: event.target.type,
			value: event.target.value,
		});
	}
	render() {
		return (
			<div>
				<label>Time of event:</label>
				<input
					type="date"
					value={this.props.date}
					onChange={this.handleChange.bind(this)}
				></input>
				<input
					type="time"
					value={this.props.time}
					onChange={this.handleChange.bind(this)}
				></input>
			</div>
		);
	}
}

class EventCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			eventDate: new Date().toISOString().substring(0, 10),
			eventTime: new Date().toISOString().substring(11, 16),
		};
		this.handleEventNameChange = this.handleEventNameChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onEventCreatorSubmit = this.onEventCreatorSubmit.bind(this);
	}

	onChange(event) {
		if (event.type === 'time') {
			this.setState({ eventTime: event.value });
		} else if (event.type === 'date') {
			this.setState({ eventDate: event.value });
		}
	}

	handleEventNameChange(event) {
		this.setState({ name: event.target.value });
	}

	onEventCreatorSubmit(event) {
		const newEvent = new Event(
			this.state.name,
			createFromDateTimeString(this.state.eventDate, this.state.eventTime),
		);
		this.props.onEventSubmit(newEvent);
		event.preventDefault();
	}
	render() {
		return (
			<form onSubmit={this.onEventCreatorSubmit}>
				<label>
					Event name:
					<input
						type="text"
						value={this.state.name}
						onChange={this.handleEventNameChange}
					></input>
				</label>
				<DatePicker
					date={this.state.eventDate}
					time={this.state.eventTime}
					onChange={this.onChange}
				></DatePicker>
				<input type="submit"></input>
			</form>
		);
	}
}

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
		};
		this.handleEventSubmit = this.handleEventSubmit.bind(this);
	}

	handleEventSubmit(e) {
		this.setState(previousState => ({
			events: [...previousState.events, e],
		}));
	}
	render() {
		return (
			<div>
				<EventCreator onEventSubmit={this.handleEventSubmit}></EventCreator>
				<EventList events={this.state.events}></EventList>
			</div>
		);
	}
}

ReactDOM.render(<Timer />, document.getElementById('root'));
