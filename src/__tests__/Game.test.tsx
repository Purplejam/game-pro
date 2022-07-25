import {render, screen} from '@testing-library/react';
import Game from '../components/Game';
import {store} from '../store/store';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom';

 
const mockGame = {
	id: 1234,
	name: 'GameTest',
	ratings: [{percent: 12}],			
	slug: 'game-test',
	added: 202020,
	released: '22-12-2022',
	background_image: 'string',
	genres: [{
			name: 'RPG',
			id: 12
		}]
}

describe('<Game/>', () => {
	it('renders properly the game component', () => {
		const {container} = render(
			<BrowserRouter>
				<React.StrictMode>
					<Provider store={store}>
						 <Game {...mockGame}/>
					</Provider>
				</React.StrictMode>
			</BrowserRouter>
			)

		const nameText = screen.getByText('GameTest');
		expect(nameText).toBeInTheDocument();

		const genreText = screen.getByText('RPG');
		expect(genreText).toBeInTheDocument();

		const addedText = screen.getByText('202020');
		expect(addedText).toBeInTheDocument();

		const releasedText = screen.getByText('Released: 22-12-2022');
		expect(releasedText).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	})
})

