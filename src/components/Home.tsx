import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gamesActionThunk} from '../actions/gamesAction';
import Game from './Game';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import GameDetail from './GameDetail';
import Nav from './Nav';
import loadingGif from '../img/loader.webp';
import {fadeIn} from '../animation';
import { AppStateType } from '../reducers/index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

//types
export type gameType = {
	id: number,
	name: string,
	ratings: {
		percent: number
	}[],			
	slug: string,
	added: number,
	released: string,
	background_image: string,
	genres: {
		name: string,
		id: number
	}[]
}

export type gameListType = Array<gameType>;

//styles
const GameList = styled(motion.div)`
	padding: 0rem 5rem 5rem 5rem;
	text-align: center;
		h4 {
			padding: 5rem 0rem 4rem 0rem;
		}
	.game-categories {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			h3 {
				cursor: pointer !important;
				padding: 5rem 0rem 1rem 0rem;
				margin-bottom: 3rem;
				position: relative;
				&::before {
				  content: "";
				  position: absolute;
				  display: block;
				  width: 100%;
				  height: 2px;
				  bottom: 0;
				  background-color: #ff7676;
				  transform: scaleX(0);
				  transition: transform 0.3s ease;
				  left: 0;
				}
				&:hover::before {
				  transform: scaleX(1);
				}
			}
		.active {
			color: #ff7676;
		}
		.deactive {
			color: #333;
		}
	}
	.loading-img {
		margin: 0 auto;
		opacity: 0.9;
	}
	.show-more-button {
		&:hover {
			color: #ff7676;
			cursor: pointer;
		}
	}
`
const Games = styled(motion.div)`
	min-height: 80vh;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	grid-column-gap: 3rem;
	grid-row-gap: 5rem;
`

type CategoryHeaderType = {
	name: string,
	setActiveCategoryHandler: Function,
	activeNav: string
}

//Tabs component
const CategoryHeader = ({name, setActiveCategoryHandler, activeNav}: CategoryHeaderType) => {
	return(
		<h3 className={`${activeNav === name ? "active" : "deactive"}`}
			onClick={() => setActiveCategoryHandler(name)}>
			{name}
		</h3>
		)
}
	
//Main component
function Home() {
	const location = useLocation();
	const path = location.pathname.split('/');
	const pathId: string = path[path.length - 1];
	const dispatch: ThunkDispatch<AppStateType, void, Action> = useDispatch();
	const {popular, upcoming, newComes, isLoading, searched} = useSelector((state: AppStateType) => state.games);
	
	useEffect(() => {
		dispatch(gamesActionThunk());
	}, [dispatch])

	useEffect(() => {
		setActiveList(popular);
	}, [popular])

	const [activeList, setActiveList] = useState<gameListType>();
	const [activeNav, setActiveNav] = useState('Popular Games');

	const setActiveCategoryHandler = (name: string) => {
		switch(name) {
			case 'Newest Games' : 
			 setActiveList(newComes);
			 setActiveNav(name);
			 break;
			case 'Popular Games' : 
			 setActiveList(popular);
			 setActiveNav(name);
			 break;
			case 'Upcoming Games' : 
			 setActiveList(upcoming);
			 setActiveNav(name);
			 break;
			default :
				setActiveList(popular);
				setActiveNav('Popular Games');
		}
	}

	return (	
		<GameList>
			<Nav/>
			{isLoading ? <img className="loading-img" src={loadingGif} alt="loading"/> : (<>
			{(searched.games.length > 0) && <div className="searched-items">
				<h4>{`We found ${searched.games.length} items of "${searched.query}":`}</h4>
				<Games variants={fadeIn} initial="hidden" animate="show">
				{searched.games.map((game: gameType) => {
					return <Game  
					slug={game.slug}
					name={game.name} 
					id={game.id} 
					key={game.id} 
					released={game.released} 
					background_image={game.background_image}
					genres={game.genres}
					ratings={game.ratings}
					added={game.added}/>
					})}
				</Games>
			</div> }
			{pathId && <GameDetail/>}
			<div className="game-categories">			
				<CategoryHeader name="Popular Games" activeNav={activeNav} setActiveCategoryHandler={setActiveCategoryHandler}/>
				<CategoryHeader name="Upcoming Games" activeNav={activeNav} setActiveCategoryHandler={setActiveCategoryHandler}/>
				<CategoryHeader name="Newest Games" activeNav={activeNav} setActiveCategoryHandler={setActiveCategoryHandler}/>
			</div>
				<Games variants={fadeIn} initial="hidden" animate="show">
				{activeList?.map(game => {
					return <Game		
					ratings={game.ratings}			
					slug={game.slug}
					added={game.added}
					name={game.name} 
					id={game.id} 
					key={game.id} 
					released={game.released} 
					background_image={game.background_image}
					genres={game.genres}/>
					})}
			</Games>
			</>)}
			<h4 className="show-more-button">Show more</h4>
		</GameList>
		)
}


export default Home;