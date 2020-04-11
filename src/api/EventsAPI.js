const APIURL = 'http://localhost:8080/api';
export const getEvents = async () => {
	const res = await fetch(`${APIURL}/events`);
	const data = await res.json();
	return data;
};

export const addEvent = async (data) => {
	normalizeData(data);
	const response = await fetch(`${APIURL}/events`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response;
};

export const removeEvent = async (id) => {
	const response = await fetch(`${APIURL}/events/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};

const normalizeData = (data) => {
	if (data.date instanceof Date) {
		data.date = data.date.getTime();
	}
};
