import Inputs from '../src/components/Inputs';
import Alert from '../src/components/Alert';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

test('Loads Input component', () => {
	Enzyme.configure({ adapter: new Adapter() });
	const currentText = 'X';
	const values = ['X','O','X','O','X','O','X','O','X']

	const wrapper = mount(
		<Inputs values={values}/>
	);

	const li = wrapper.find('.container li').at(0);

	expect(li.text()).toBe("X");

});

test('Loads Winner in Alert component', () => {
	Enzyme.configure({ adapter: new Adapter() });

	const winner = "X";

	const wrapper = mount(
		<Alert winner={winner} />
	);
	expect(wrapper.text()).toBe('The Winner Is: X');
});

test('Loads current player in Alert component', () => {
	Enzyme.configure({ adapter: new Adapter() });

	const currentText = "X";

	const wrapper = mount(
		<Alert currentText={currentText} />
	);
	expect(wrapper.text()).toBe('It is X\'s turn.');
});