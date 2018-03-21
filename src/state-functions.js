
export function setWinner(winner) {
	return { winner };
}

export function resetState(defaultObj) {
	return defaultObj;
}

export function setInputValues(state, obj) {
	const newState = Object.assign(state, obj);

	return newState;
}