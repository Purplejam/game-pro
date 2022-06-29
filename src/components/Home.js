import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {gamesActionThunk} from '../actions/gamesAction.js';
import Game from './Game';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import {gameDetailsURL} from '../api.js';
import axios from "axios";
import { useLocation } from "react-router-dom";
import GameDetail from './GameDetail.js';
import Nav from './Nav.js';
import loadingGif from '../img/loader.webp';
import {fadeIn, item} from '../animation.js';


//Styles
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
				padding: 5rem 0rem 4rem 0rem;
			}
		.active {
			color: #ff7676;;
		}
		.deactive {
			color: #333;
		}
	}
	.loading-img {
		margin: 0 auto;
		opacity: 0.9;
	}
`
const Games = styled(motion.div)`
	min-height: 80vh;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	grid-column-gap: 3rem;
	grid-row-gap: 5rem;
`

//Tabs component
const CategoryHeader = ({name, setActiveCategoryHandler, activeNav}) => {
	return(
		<h3 className={`${activeNav == name ? "active" : "deactive"}`}
			onClick={() => setActiveCategoryHandler(name)}>
			{name}
		</h3>
		)
}
	
//Main component
function Home() {
	const location = useLocation();
	const path = location.pathname.split('/');
	const pathId = path[path.length - 1];
	const dispatch = useDispatch();
	const {popular, upcoming, newComes, isLoading, searched} = useSelector((state) => state.games);
	
	useEffect(() => {
		dispatch(gamesActionThunk());
	}, [dispatch])

	useEffect(() => {
		setActiveList(popular);
	}, [popular])

	const [activeList, setActiveList] = useState([]);
	const [activeNav, setActiveNav] = useState('Popular Games');

	const setActiveCategoryHandler = (name) => {
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
				setActiveNav(popular);
		}
	}

	return (	
		<GameList>
			<Nav/>
			{isLoading ? <img className="loading-img" src={loadingGif} alt="loading"/> : (<>
			{(searched.games.length > 0) && <div className="searched-items">
				<h4>{`We found ${searched.games.length} items of "${searched.query}":`}</h4>
				<Games variants={fadeIn} initial="hidden" animate="show">
				{searched.games.map(game => {
					return <Game  
					slug={game.slug}
					name={game.name} 
					id={game.id} 
					key={game.id} 
					released={game.released} 
					image={game.background_image}/>
					})}
				</Games>
			</div> }
			{pathId && <GameDetail layout/>}
			<div className="game-categories">			
				<CategoryHeader name="Popular Games" activeNav={activeNav} setActiveCategoryHandler={setActiveCategoryHandler}/>
				<CategoryHeader name="Upcoming Games" activeNav={activeNav} setActiveCategoryHandler={setActiveCategoryHandler}/>
				<CategoryHeader name="Newest Games" activeNav={activeNav} setActiveCategoryHandler={setActiveCategoryHandler}/>
			</div>
				<Games variants={fadeIn} initial="hidden" animate="show">
				{activeList.map(game => {
					return <Game					
					slug={game.slug}
					name={game.name} 
					id={game.id} 
					key={game.id} 
					released={game.released} 
					image={game.background_image}/>
					})}
			</Games>
			</>)}
		</GameList>
		)
}


export default Home;