import React from 'react';
import style from './nav-button.module.css';

export default function NavButton(props) {
	return (
		<button className={style.navButton} onClick={props.onClick}>
			<img src={props.icon} className={style.icon} />
		</button>
	);
}
