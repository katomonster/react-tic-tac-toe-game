import Inputs from '../src/components/Inputs';

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

test('loads Input component', () => {
	Enzyme.configure({ adapter: new Adapter() })
	const currentText = 'X';
	const values = ['X','O','X','O','X','O','X','O','X']

	const wrapper = mount(
		<Inputs values={values}/>
	);

	const li = wrapper.find('.container li').at(0);

	expect(li.text()).toBe("X");

});