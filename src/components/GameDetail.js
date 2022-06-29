import React from 'react';
import {motion, AnimateSharedLayout} from 'framer-motion';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
import nintendo from '../img/nintendo.svg';
import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import fullStar from '../img/star-full.png';
import emptyStar from '../img/star-empty.png';
import loadingGif from '../img/loader.webp';
import {gameResetAction} from '../actions/gameDetailAction.js';
import {useDispatch} from 'react-redux';

//Styles
const CardShadow = styled(motion.div)`
	position: fixed;
	overflow-y: scroll;
	min-height: 100vh;
	width: 100%;
	background-color: rgba(0,0,0,0.5);
	top: 0;
	left: 0;
	padding-top: 4rem;
	&::-webkit-scrollbar {
		width: 0.5rem;
	}
	&::-webkit-scrollbar-thumb {
		width: 0.5rem;
		background-color: #ff7676;
	}
	&::-webkit-scrollbar-track {
		width: 0.5rem;
		background-color: white;
	}
`
const Detail = styled(motion.div)`
	width: 80%;
	min-height: 90vh;
	border-radius: 0.5rem;
	padding: 2rem 5rem;
	background-color: white;
	position: absolute;
	left: 10%;
	color: black;
	img {
		width: 100%;
	}
	h3 {
		padding: 1.5rem 0rem !important;
	}
	.rating {
		text-align: left;
		img {
			display: inline;
			width: 2rem;
			height: 2rem;	
		}
	}
	.platforms {
		text-align: right;
	}
	.loading-img {
		width: 5rem;
		height: 5rem;
		margin-top: 4rem;
	}
`

const Stats = styled(motion.div)`
	display: flex;
	justify-content: space-between;
`

const Info = styled(motion.div)`
	text-align: center;
	h3 {
		text-align: right;
	}
`

const Platforms = styled(motion.div)`
	display: flex;
	justify-content: space-evenly;
	img {
		margin-left: 3rem;
	}
`

const Media = styled(motion.div)`
	margin-top: 5rem;
	img {
		width: 100%;
	}
`
const Description = styled(motion.div)`
	margin: 5rem 0rem;
`

//Get platform logo
function getGameImage(platform) {
	switch(platform) {
		case 'Apple' :
			return apple;
		case 'Xbox' : 
			return xbox;
		case 'PlayStation' : 
			return playstation;
		case 'Nintendo' : 
			return nintendo;
		case 'Steam' : 
			return steam;
		default : 
			return gamepad;
	}
}

//Get star raiting
function getStarRaiting(raiting) {
	let star = [];
	raiting = Math.floor(raiting);
	for (let i = 1; i <= 5; i++) {
		if (i <= raiting) {
			star.push(<img src={fullStar} key={i}/>)
		} else {
			star.push(<img src={emptyStar} key={i}/>)
		}
	}
	return star;
}

//Main component
function GameDetail({pathId}) {
	const {game, screen, isLoading} = useSelector(state => state.gameDetail);
	const history = useNavigate();
	const dispatch = useDispatch();

	const shadowExitHandler = (e) => {	
		if (e.target.classList.contains('shadow')) {
			dispatch(gameResetAction());
			document.body.style.overflow = 'auto';
			history('/');
		}
	}

	return(
				<CardShadow className="shadow" onClick={shadowExitHandler}>
					<Detail>
						{isLoading ? <img className="loading-img" src={loadingGif} alt="loading"/> : (
						<>
							<Stats className="stats">
								<div className="rating">
									<motion.h3>{game.name}</motion.h3>
									<p>Rating: {game.rating}</p>
									<div className="star-raiting">{getStarRaiting(game.rating)}</div>
								</div>
								<Info>
									<h3>Platforms</h3>
									<Platforms className="platforms">
										{game.parent_platforms.map(data => (
											<img key={data.platform.id} src={getGameImage(data.platform.name)}/>
											))}
									</Platforms>
								</Info>
							</Stats>
							<Media>
								<motion.img src={game.background_image} alt={game.name}/>
							</Media>
							<Description>
								<p>{game.description_raw}</p>
							</Description>
							<div className="gallery">
								{screen.results.map(screen => (
									<img src={screen.image} alt="image" key={screen.id}/>
									))}
							</div>
						</>
						)}
					</Detail>
				</CardShadow>
		)
}


export default GameDetail;