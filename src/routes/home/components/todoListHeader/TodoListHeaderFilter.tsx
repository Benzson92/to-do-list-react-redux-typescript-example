import React, { useState, useCallback } from 'react';

import { TaskType } from '../../../../types/TaskType';

import TodoListHeaderDownArrowIcon from './icons/TodoListHeaderDownArrowIcon';

import styles from './TodoListHeaderFilter.module.scss';

type Props = {
	isDisabled: boolean;
	currentValue: TaskType;
	setCurrentValue: React.Dispatch<React.SetStateAction<TaskType>>;
};

const TodoListHeaderFilter: React.FunctionComponent<Props> = ({
	isDisabled,
	currentValue,
	setCurrentValue,
}) => {
	const [open, setOpen] = useState(false);

	const handleToggleSelectButton = () => {
		setOpen((prevState) => !prevState);
	};

	const handleChange = useCallback(
		(value: TaskType) => {
			setCurrentValue(value);
			handleToggleSelectButton();
		},
		[setCurrentValue]
	);

	return (
		<div
			className={`${styles.TodoListHeaderFilter} ${
				isDisabled ? 'disabled' : ''
			}`}
		>
			<button
				disabled={isDisabled}
				onClick={handleToggleSelectButton}
				className={styles.SelectButton}
			>
				{currentValue ? currentValue : TaskType.All}
				<div
					title="Down Arrow Icon"
					className={`${styles.TodoListHeaderDownArrowIcon} ${
						open ? styles.ActiveTodoListHeaderDownArrowIcon : ''
					}`}
				>
					<TodoListHeaderDownArrowIcon />
				</div>
			</button>
			{open && (
				<div className={styles.DropdownMenu}>
					{Object.values(TaskType).map((value) => {
						const isActive = value === currentValue;

						return (
							<div
								key={value}
								onClick={() => handleChange(value)}
								className={`${styles.DropdownMenuItem} ${
									isActive ? styles.ActiveDropdownMenuItem : ''
								}`}
							>
								{value}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default TodoListHeaderFilter;
