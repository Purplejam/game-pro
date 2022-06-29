import {motion, AnimateSharedLayout} from 'framer-motion';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import {gamesSearchThunk, clearDataAction} from '../actions/gamesAction.js';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

const StyledNav = styled(motion.div)`
	padding: 3rem 5rem;
 text-align: center;
 input {
   width: 30%;
   font-size: 1.5rem;
   padding: 0.5rem;
   border: none;
   margin-top: 1rem;
   box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
 }
 button {
   font-size: 1.5rem;
   border: none;
   padding: 0.5rem 2rem;
   cursor: pointer;
   background: #ff7676;
   color: white;
 }
`

const Logo = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
 padding: 1rem;
 cursor: pointer;
 img {
   height: 2rem;
   width: 2rem;
 }
`

const Search = styled(motion.form)`
	
`

export default function Nav() {
	const [inputValue, setInput] = useState('');
	const dispatch = useDispatch();

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		await dispatch(gamesSearchThunk(inputValue));
		setInput('');
	}

	const clearInputHandler = () => {
		dispatch(clearDataAction());
		setInput('');
	}

	return(
		<StyledNav>
			<Logo onClick={clearInputHandler}>
				<img src={logo} alt="logo"/>
				<h1>Ignite</h1>
			</Logo>
			<Search onSubmit={formSubmitHandler}>
				<input value={inputValue} type="text" onChange={(e) => setInput(e.target.value)}/>
				<button type="submit">Search</button>
			</Search>
		</StyledNav>
		)
}