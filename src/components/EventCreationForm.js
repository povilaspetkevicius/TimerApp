import React from 'react';
import DatePicker from './DatePicker';
import { addEvent } from '../api/EventsAPI';

const block = {
	width: '45%',
	display: 'inline-block',
	margin: '10px',
	verticalAlign: 'top',
};

const inputBlock = Object.assign(
	{
		float: 'right',
	},
	block,
);

const submitButton = {
	width: '100%',
	align: 'center',
};

const formContainer = {
	minWidth: '20rem',
	maxWidth: '40rem',
	border: '1px solid',
};
const error = {
	color: '#db2269',
	fontSize: '0.625em',
	display: 'relative',
};

class EventCreationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Random event!',
			date: new Date(),
			canSubmit: false,
			errors: {
				date: '',
			},
		};
	}

	handleChange = (e) => {
		const updatedState = Object.assign({}, this.state);
		switch (e.target.type) {
			case 'text': {
				updatedState.name = e.target.value;
				break;
			}
			case 'time': {
				updatedState.date.setHours(
					e.target.value.substring(0, 2),
					e.target.value.substring(3, 5),
				);
				break;
			}
			case 'date': {
				updatedState.date.setFullYear(
					e.target.value.substring(0, 4),
					parseInt(e.target.value.substring(5, 7)) - 1,
					e.target.value.substring(8, 10),
				);
				updatedState.errors.date = '';
				updatedState.canSubmit = true;
				break;
			}
			default: {
				break;
			}
		}
		this.setState(updatedState);
	};

	formIsValid = () => {
		const formErrors = Object.assign({}, this.state.errors);
		if (Date.now() > this.state.date.getTime()) {
			formErrors.date = 'Please set a date to one in the future!';
			this.setState({ errors: formErrors });
			return false;
		} else {
			return true;
		}
	};

	validateAndSubmit = async (e) => {
		e.preventDefault();
		if (this.formIsValid()) {
			try {
				const responseFromServer = await addEvent({
					name: this.state.name,
					date: this.state.date,
				});
				if (responseFromServer.status === 201) {
					this.props.addEvent(await responseFromServer.json());
				} else {
					throw new Error(
						'Saving of event did not go according to the plan. Try again!',
					);
				}
			} catch (e) {
				throw new Error(`Couldn't save an event due to: ${e.message}`);
			}
		}
	};

	render() {
		return (
			<div style={formContainer}>
				<form onSubmit={this.validateAndSubmit}>
					<label style={block}>Name of event</label>
					<input
						style={inputBlock}
						type="text"
						onChange={this.handleChange}
						placeholder={this.state.name}
					></input>
					<br></br>
					<label style={block}>Time of event</label>
					<div style={inputBlock}>
						<DatePicker onDatepickerChange={this.handleChange} />
						{this.state.errors.date.length > 0 && (
							<span style={error}>{this.state.errors.date}</span>
						)}
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
