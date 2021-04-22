import React from 'react';
import style from './generator-button.module.css';

export default function GeneratorButton(props) {
	return (
		<div className={style.container}>
			<div className={style.button} onClick={props.onClick}>
				<span className={style.result}>{props.result}</span>
				<span className={style.prompt}>{props.prompt}</span>
			</div>
		</div>
	);
}
