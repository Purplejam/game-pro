import {motion} from 'framer-motion';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import {gamesSearchThunk, clearDataAction} from '../actions/gamesAction';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { AppStateType } from '../reducers/index';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';


//styles
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
 @media (max-width: 768px) {
 	padding: 1rem 0rem;
  input {
  	width: 60%;
  	margin-top: 1rem;
  	font-size: 1rem;
  }
  button {
  	font-size: 1rem;
  	padding: 0.5rem 1rem;
  }

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
	const dispatch: ThunkDispatch<AppStateType, void, Action> = useDispatch();

	const formSubmitHandler = async (e: React.FormEvent) => {
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
			<Logo data-testid="search-logo" onClick={clearInputHandler}>
				<img src={logo} alt="logo"/>
				<h1>Game PRO</h1>
			</Logo>
			<Search onSubmit={formSubmitHandler}>
				<input data-testid="search-input" value={inputValue} type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}/>
				<button type="submit">Search</button>
			</Search>
		</StyledNav>
		)
}