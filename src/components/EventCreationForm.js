import React from 'react';
import DatePicker from './DatePicker';

const block = {
	width: '45%',
	display: 'inline-block',
	margin: '10px',
};

const submitButton = {
	width: '100%',
	align: 'center',
};

const formContainer = {
	minWidth: '200px',
	maxWidth: '500px',
	border: '1px solid',
};

const placeholderEventName = 'Random event!';

class EventCreationForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: placeholderEventName,
			date: new Date(),
			canSubmit: false,
		};
	}

	handleChange = (e) => {
		const updatedState = {
			name: this.state.name,
			date: this.state.date,
			canSubmit: this.state.canSubmit,
		};
		if (e.target?.type === 'text') {
			updatedState.name = e.target.value;
		} else if (e.type === 'time') {
			updatedState.date.setHours(
				e.value.substring(0, 2),
				e.value.substring(3, 5),
			);
		} else {
			updatedState.date.setFullYear(
				e.value.substring(0, 4),
				parseInt(e.value.substring(5, 7)) - 1,
				e.value.substring(8, 10),
			);
		}
		this.setState(updatedState);
	};

	validateAndSubmit = (e) => {
		this.props.addEvent({
			name: this.state.name,
			date: this.state.date,
		});
		e.preventDefault();
	};

	render() {
		return (
			<div style={formContainer}>
				<form onSubmit={this.validateAndSubmit}>
					<label style={block}>Name of event</label>
					<input
						style={block}
						type="text"
						onChange={this.handleChange}
						placeholder={this.state.name}
					></input>
					<br></br>
					<label style={block}>Time of event</label>
					<div style={block}>
						<DatePicker onDatepickerChange={this.handleChange} />
					</div>
					<br></br>
					<input
						type="submit"
						value="Submit"
						style={submitButton}
						disabled={!this.state.canSubmit}
					></input>
				</form>
			</div>
		);
	}
}
export default EventCreationForm;
