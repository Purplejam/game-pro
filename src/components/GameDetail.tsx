import {motion} from 'framer-motion';
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
import {gameResetAction} from '../actions/gameDetailAction';
import {useDispatch} from 'react-redux';
import {smallImage} from './Game';
import { AppStateType } from '../reducers/index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import {detailReducerType} from '../reducers/gameDetailReducer'


//types 
type gamePlatFormType = {
	platform: {
		id: number, 
		name: string
	}
}

type screenGameType = {
	image: string,
	id: number
}


//styles
const CardShadow = styled(motion.div)`
	position: fixed;
	overflow-y: scroll;
	min-height: 100vh;
	width: 100%;
	background-color: rgba(0,0,0,0.5);
	top: 0;
	left: 0;
	padding-top: 4rem;
	z-index: 999;
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
	.gallery {
		img {
			margin-bottom: 1rem;
		}
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
	 @media (max-width: 768px) {
	 	width: 96%;
	 	left: 2%;
	 	padding: 1rem 1rem;
 }
`

const Stats = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	@media (max-width: 768px) {
		.star-raiting {
			img {
				width: 1rem;
				height: 1rem;
			}
		}
 }
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
	@media (max-width: 768px) {
		margin-top: 3rem;
	}
`
const Description = styled(motion.div)`
	margin: 5rem 0rem;
	@media (max-width: 768px) {
		margin: 3rem 0rem;
	}
`

//get platform logo
function getGameImage(platform: string | null) {
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

//get star raiting
function getStarRaiting(raiting: number | null) {
	let star = [];
	if (raiting !== null) {
		raiting = Math.floor(raiting);
		for (let i = 1; i <= 5; i++) {
			if (i <= raiting) {
				star.push(<img src={fullStar} key={i} alt="Full Star"/>)
			} else {
				star.push(<img src={emptyStar} key={i} alt="Empty Star"/>)
			}
		}
		return star;
	}
}

//components wrapper
function GameDetailWrapper() {
	const {game, screen, isLoading} = useSelector((state: AppStateType) => state.gameDetail);
	return(
		<GameDetail game={game} screen={screen} isLoading={isLoading}/>
		)
}

//main component
export function GameDetail({game, screen, isLoading}: detailReducerType) {
	
	const history = useNavigate();
	const dispatch: ThunkDispatch<AppStateType, void, Action> = useDispatch();

	const shadowExitHandler = (e: React.MouseEvent<HTMLDivElement>) => {	
		const target = e.target as Element;
		if (target.classList.contains('shadow')) {
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
									<div className="star-raiting">{getStarRaiting(game!.rating)}</div>
								</div>
								<Info>
									<h3>Platforms</h3>
									<Platforms className="platforms">
										{game.parent_platforms.map((data: gamePlatFormType) => (
											<img alt={data.platform.name} key={data.platform.id} src={getGameImage(data.platform.name)}/>
											))}
									</Platforms>
								</Info>
							</Stats>
							<Media>
								<motion.img alt={game.name} src={smallImage(game.background_image, 1280)}/>
							</Media>
							<Description>
								<p>{game.description_raw}</p>
							</Description>
							<div className="gallery">
								{screen.results.map((screen: screenGameType) => (
									<img src={smallImage(screen.image, 1280)} alt={`${screen.id}`} key={screen.id}/>
									))}
							</div>
						</>
						)}
					</Detail>
				</CardShadow>
		)
}


export default GameDetailWrapper;