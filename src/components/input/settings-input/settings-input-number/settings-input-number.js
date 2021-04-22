import React from 'react';
import style from './settings-input-number.module.css';
import settingsInputStyle from '../settings-input.module.css';

export default function SettingsInputNumber(props) {
	const [previousValue, setPreviousValue] = React.useState(props.defaultValue);
	const [valid, setValid] = React.useState(true);

	function validate(value) {
		const result = !(
			props.min && value < props.min
			|| props.max && value > props.max
			|| props.required && value === undefined
		);
		return result;
	}

	function onChange(event) {
		const value = Number(event.target.value);
		const isValid = validate(value);
		setValid(isValid);
		if (isValid) {
			setPreviousValue(value)
			props.onChange(value);
		}
	}

	function onBlurResetIfInvalid(event) {
		const value = Number(event.target.value);
		if (!validate(value)) {
			event.target.value = previousValue;
			setValid(true);
		}
	}

	return (
		<input
			id={props.id}
			className={`${settingsInputStyle.settingsInput} ${style.settingsInputNumber}`}
			data-valid={valid}
			type="number"
			min={props.min}
			max={props.max}
			defaultValue={props.defaultValue}
			step={props.step}
			autoComplete="number"
			onChange={onChange}
			onBlur={onBlurResetIfInvalid}
		></input>
	);
}
