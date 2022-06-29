import React from 'react';
import {motion, AnimateSharedLayout} from 'framer-motion';
import styled from 'styled-components';
import {gameDetailAction} from '../actions/gameDetailAction.js';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import default_img from "../img/default_img.png";
import {fadeIn, item} from '../animation.js';

//Styles
const StyledGame = styled(motion.div)`
	img {
		width: 100%;
		height: 40vh;
		object-fit: cover;
	}
	h3 {
		cursor: pointer;
	}
	min-height: 30vh;
	box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
	text-align: center;
	border-radius: 1rem;
	overflow: hidden; 
`
//Media resize
export const smallImage = (imagePath, size) => {
  const image = imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        "media/screenshots",
        `media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`);
  return image;
};


function Game({name, released, image, id, slug}) {
	const dispatch = useDispatch();
	const layoutId = id.toString();

	function idGameHandler() {
		document.body.style.overflow = 'hidden';
		dispatch(gameDetailAction(id, slug));
	}

	return(
		<StyledGame variants={item} onClick={idGameHandler}>
			<Link to={`/game/${id}`}>
				<motion.h3>{name}</motion.h3>	
				<p>{released}</p>
				<motion.img src={image == null ? default_img : image}/>
			</Link>	
		</StyledGame>
		)
}

export default Game;