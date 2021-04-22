import React from 'react';
import style from './settings-input-button.module.css';
import settingsInputStyle from '../settings-input.module.css';

export default function SettingsInputButton(props) {
	return (
		<button
			className={`${settingsInputStyle.settingsInput} ${style.settingsInputButton}`}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
}
