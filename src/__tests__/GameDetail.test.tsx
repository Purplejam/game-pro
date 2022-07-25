import {render, screen} from '@testing-library/react';
import {GameDetail} from '../components/GameDetail';
import {store} from '../store/store';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom';

 
const gameDetailMock = {
	game: {
		name: 'TopGame',
		id: 1234,
		rating: 44,
		parent_platforms: [{
			platform: {
				id: 1,
				name: 'Apple'
			}
		}],
		background_image: 'game-img.jpg',
		description_raw: 'lorem ipsum'
	},
	screen: {
		results: [{
					id: 1234,
					image: 'game-img.jpg'
				}]
	},
	isLoading: false,
}

const gameDetailMockLoading = {
	...gameDetailMock,
	isLoading: true,
}

describe('<GameDetail/>', () => {
	it('renders properly the game component', () => {
		const {container} = render(
			<BrowserRouter>
				<React.StrictMode>
					<Provider store={store}>
						 <GameDetail {...gameDetailMock}/>
					</Provider>
				</React.StrictMode>
			</BrowserRouter>
			)

		const nameText = screen.getByText('TopGame');
		expect(nameText).toBeInTheDocument();

		const platformText = screen.getByAltText('Apple');
		expect(platformText).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	})

		it('renders properly while loading', () => {
		render(
			<BrowserRouter>
				<React.StrictMode>
					<Provider store={store}>
						 <GameDetail {...gameDetailMockLoading}/>
					</Provider>
				</React.StrictMode>
			</BrowserRouter>
			)

		const platformText = screen.getByAltText('loading');
		expect(platformText).toBeInTheDocument();

	})
})

