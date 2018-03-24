
export function setWinner(winner) {
	return { winner };
}

export function resetState(defaultObj) {
	return defaultObj;
}

export function updateStateValues(state, obj) {
	const newState = Object.assign(state, obj);

	return newState;
}

export function setNewHistory(history, newValues) {
	const newHistory = [...history];
	newHistory.push(newValues);
	return newHistory;
}

export function defaultState() {
	const defaultValues = Array(9).fill('');

	return {
		currentText: 'O',
		values: defaultValues,
		winner: undefined,
		history: [],
		gameover: false
	};
}
