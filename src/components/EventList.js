import React from 'react';
import Event from './Event';

const listStyle = {
	listStyleType: 'none',
	paddingLeft: '0rem',
	paddingRight: '1rem',
};

class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { timestamp: Date.now() };
		// this.updateTimer = this.updateTimer.bind(this);
	}

	updateTimer = () => {
		this.timer = setInterval(() => {
			this.setState({
				timestamp: Date.now(),
			});
		}, 1);
	};

	deleteEvent = (id) => {
		this.props.deleteEvent(id);
	};

	render() {
		this.updateTimer();
		const listItems = this.props.events.map((e, i) => {
			return (
				<li key={i}>
					<Event event={e} deleteEvent={this.deleteEvent} />
				</li>
			);
		});
		return <ul style={listStyle}>{listItems}</ul>;
	}
}

export default EventList;
