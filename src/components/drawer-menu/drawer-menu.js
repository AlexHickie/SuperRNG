import React from 'react';
import style from './drawer-menu.module.css';
import NavButton from '../input/nav-button/nav-button.js';
import ArrowRight from '../../assets/icons/arrow-right.svg';

export default function DrawerMenu(props) {
	const close = () => {
		props.onCloseCallback();
	}

	const stopEventPropagation = (event) => {
		event.stopPropagation();
	}

	return (
		<div className={style.container} data-visible={props.visible} onClick={close}>
			<div className={style.drawerMenu} data-visible={props.visible} onClick={stopEventPropagation}>
				<div className={style.toolbar}>
					<span className={style.title}>{props.title}</span>
					<div className={style.closeButtonContainer}>
						<NavButton onClick={close} icon={ArrowRight} />
					</div>
				</div>
				{props.options}
			</div>
		</div>
	);
}

DrawerMenu.defaultProps = {
	onCloseCallback: () => void 0,
	title: 'Title'
};
