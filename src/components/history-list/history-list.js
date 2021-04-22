import React, { useEffect } from 'react';
import style from './history-list.module.css';

export default function HistoryList(props) {
	const listContainerRef = React.createRef();
	const results = props.results.join(' ');

	useEffect(() => {
		listContainerRef.current.scrollLeft = listContainerRef.current.scrollWidth;
	}, [results]);

	return (
		<div>
			<span className={style.historyLabel}>History</span>
			<div className={style.listAndOrderLabelsContainer}>
				<span className={`${style.orderLabel} ${style.orderLabelLeft}`}>Oldest</span>
				<span className={`${style.orderLabel} ${style.orderLabelRight}`}>Newest</span>
				<div className={style.listContainer} ref={listContainerRef}>
					<span className={style.list}>{results}</span>
				</div>
			</div>
		</div>
	);
}

HistoryList.defaultProps = {
	results: []
};
