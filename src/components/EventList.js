import React from 'react';
import Event from './Event';
class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentDateInMillis: Date.now() };
		this.updateTimer = this.updateTimer.bind(this);
	}

	componentDidUpdate(previousProps) {
		if (previousProps !== this.props) {
			console.log(this.props);
		}
	}

	updateTimer = () => {
		this.timer = setInterval(() => {
			this.setState({
				currentDateInMillis: Date.now(),
			});
		}, 1);
	};

	render() {
		this.updateTimer();
		const listItems = this.props.events.map((e, i) => {
			return (
				<li key={i}>
					<Event
						name={e.name}
						diffInMillis={e.date - this.state.currentDateInMillis}
					/>
				</li>
			);
		});
		return <ul>{listItems}</ul>;
	}
}

export default EventList;
