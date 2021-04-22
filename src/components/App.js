import React from 'react';
import styles from './App.module.css';
import Toolbar from './toolbar/toolbar.js';
import DrawerMenu from './drawer-menu/drawer-menu.js';
import DrawerMenuOptions from './drawer-menu/options/drawer-menu-options.js';
import GeneratorButton from './generator-button/generator-button.js';
import HistoryList from './history-list/history-list.js';
import Generator from './generator.js';

const defaultNumberOfDice = 1;
const maxNumberOfDice = 4;
const defaultSidesOnDie = 6;
const maxSidesOnDie = 20;
const generator = new Generator(defaultSidesOnDie, defaultNumberOfDice);
const prompts = {
	generateFirst: 'Tap to generate.',
	generateNext: ''
};

export default function App() {
	const [drawerMenuVisible, setDrawerMenuVisible] = React.useState(false);
	const [prompt, setPrompt] = React.useState(prompts.generateFirst);
	const [result, setResult] = React.useState('');
	const [resultHistory, setResultHistory] = React.useState([]);

	function onChangeNumberOfDiceInput(value) {
		generator.setNumberOfDice(value);
	}

	function onChangeSidesOnDieInput(value) {
		generator.setSidesOnDie(value);
	}

	function onGenerateClick() {
		const generatedNumber = generator.generateNumber();
		setResult(String(generatedNumber));
		setResultHistory([...resultHistory, generatedNumber]);
		setPrompt(prompts.generateNext);
	}

	const drawerMenuOptions = DrawerMenuOptions({
		defaultSidesOnDie,
		maxSidesOnDie,
		onChangeSidesOnDieInput,
		defaultNumberOfDice,
		maxNumberOfDice,
		onChangeNumberOfDiceInput,
		setResultHistory
	});

	return (
		<div className={styles.appContainer}>
			<Toolbar menuButtonOnClick={() => setDrawerMenuVisible(true)} />
			<DrawerMenu
				options={drawerMenuOptions}
				visible={drawerMenuVisible}
				title="Settings"
				onCloseCallback={() => setDrawerMenuVisible(false)}
			/>
			<GeneratorButton
				result={result}
				prompt={prompt}
				onClick={onGenerateClick}
			/>
			<HistoryList results={resultHistory.slice(0, resultHistory.length - 1)} />
		</div >
	);
};
