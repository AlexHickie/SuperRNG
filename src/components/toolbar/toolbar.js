import React from 'react';
import style from './toolbar.module.css';
import NavButton from '../input/nav-button/nav-button.js';
import MenuIcon from '../../assets/icons/hamburger-menu.svg';

export default function Toolbar(props) {
	return (
		<div className={style.toolbar}>
			<NavButton onClick={props.menuButtonOnClick} icon={MenuIcon} />
		</div>
	);
}
