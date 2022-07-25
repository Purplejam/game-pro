import {render, screen, fireEvent} from '@testing-library/react';
import Nav from '../components/Nav';
import {store} from '../store/store';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom';

 
describe('<Nav/>', () => {
	it('renders properly the game component', () => {
		const {container} = render(
			<BrowserRouter>
				<React.StrictMode>
					<Provider store={store}>
						 <Nav/>
					</Provider>
				</React.StrictMode>
			</BrowserRouter>
			)

		const logo = screen.getByAltText('logo');
		expect(logo).toBeInTheDocument();
		const input = screen.getByTestId<HTMLInputElement>('search-input');

		fireEvent.change(input, {target: {value: 'warcraft 3'}});
  expect(input.value).toBe('warcraft 3');

  //check if input is clear
  fireEvent.click(logo);
  expect(input.value).toBe('');

  //check if input has changed
  fireEvent.change(input, {target: {value: 'warcraft 12'}});
  expect(input.value).toBe('warcraft 12');
		expect(container).toMatchSnapshot();
	})
})

