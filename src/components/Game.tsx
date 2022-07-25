import {motion} from 'framer-motion';
import styled from 'styled-components';
import {gameDetailAction} from '../actions/gameDetailAction';
import {useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import default_img from "../img/default_img.png";
import { item } from '../animation';
import star from '../img/star-full.png';
import { gameType } from './Home';
import { AppStateType } from '../reducers/index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';


//styles
const StyledGame = styled(motion.div)`
	img {
		width: 100%;
		height: 40vh;
		object-fit: cover;
	}
	h3 {
		cursor: pointer;
		padding: 2rem 0rem 0.5rem 0rem;
	}
	min-height: 30vh;
	box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
	text-align: center;
	border-radius: 1rem;
	overflow: hidden; 
	.game-meta-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: space-between;
		padding: 1rem 2rem;
			img {
				width: 1.2rem;
				height: 1.2rem;
				display: inline-block;
				margin-left: 0.5rem;
				margin-top: -0.1rem;
				vertical-align: middle;
			}
			div, p {
				display: inline-block;
				font-weight: 700;
			}
			.game-raiting {
				display: flex;
				align-items: center;
			}
	}
	.game-genres {
		text-align: center;
		padding: 1rem 2rem;
	}
 @media (max-width: 768px) {
 }
`
//media resize
export const smallImage = (imagePath: string, size: number) => {
  const image = imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        "media/screenshots",
        `media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`);
  return image;
};

//rating color
const ratingColor = (rate: number) => {
	if (rate >= 70 && rate < 100) {
		return 'green';
	} else if (rate >= 50 && rate < 70) {
		return 'orange';
	} else if (rate > 0 && rate < 50) {
		return 'red';
	}
}


function Game({name, released, background_image, id, slug, genres, ratings, added}: gameType) {
	const dispatch: ThunkDispatch<AppStateType, void, Action> = useDispatch();

	function idGameHandler() {
		document.body.style.overflow = 'hidden';
		dispatch(gameDetailAction(id, slug));
	}

	return(
		//@ts-ignore
		<StyledGame variants={item} onClick={idGameHandler}>
			<Link to={`/game/${id}`}>
				<motion.h3>{name}</motion.h3>	
				<p>Released: {released}</p>
				<motion.img src={background_image == null ? default_img : smallImage(background_image, 420)}/>
				{(genres.length > 0) 
					? <p className="game-genres">Genre{genres.length > 1 ? 's' : null}: {genres.map(genre => <span key={genre.id}>{genre.name + ' '}</span>)}</p>
					: <p className="game-genres">Genre: video game</p>}
				<div className="game-meta-info">
					{ratings.length !== 0 ? <p style={{color: ratingColor(ratings[0].percent)}}>Raiting: {Math.floor(ratings[0].percent)}</p> : null}
					<div className="game-raiting">
						<p>{added}</p>
						<img src={star} alt=""/>
					</div>
				</div>
			</Link>	
		</StyledGame>
		)
}

export default Game;