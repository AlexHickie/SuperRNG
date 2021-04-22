import React from 'react';
import style from './drawer-menu-options.module.css';
import SettingsInputNumber from '../../input/settings-input/settings-input-number/settings-input-number.js';
import SettingsInputButton from '../../input/settings-input/settings-input-button/settings-input-button.js';

export default function DrawerMenuOptions(props) {
    return (
        <div className={style.optionsList}>
            <label htmlFor="option-die_sides" className={style.optionLabel}>Sides on die</label>
            <SettingsInputNumber
                id="option-die_sides"
                min="1"
                max={props.maxSidesOnDie}
                defaultValue={props.defaultSidesOnDie}
                step="1"
                required
                onChange={props.onChangeSidesOnDieInput}
            />
            <label htmlFor="option-number_of_dice" className={style.optionLabel}>Number of dice</label>
            <SettingsInputNumber
                id="option-number_of_dice"
                min="1"
                max={props.maxNumberOfDice}
                defaultValue={props.defaultNumberOfDice}
                step="1"
                required
                onChange={props.onChangeNumberOfDiceInput}
            />
            <SettingsInputButton text="Clear History" onClick={() => props.setResultHistory([])} />
            <a
                href="https://github.com/AlexHickie/SuperRNG"
                className={style.sourceLink}
                target="_blank"
                rel="noreferrer noopener"
            >
                <SettingsInputButton text="View Source on GitHub" />
            </a>
        </div>
    );
}
