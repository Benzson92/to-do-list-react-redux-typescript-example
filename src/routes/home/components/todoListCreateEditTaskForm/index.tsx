import React, {
	useState,
	useCallback,
	ChangeEvent,
	KeyboardEvent,
} from 'react';

import styles from './index.module.scss';

type Props = {
	isDisabled: boolean;
	onSaveTaskTitle: (title: string) => void;
	taskItemTitle?: string;
};

const TodoListCreateEditTaskForm: React.FunctionComponent<Props> = ({
	isDisabled = false,
	onSaveTaskTitle,
	taskItemTitle = '',
}) => {
	const [currentValue, setCurrentValue] = useState(taskItemTitle);

	const trimmedCurrentValue = currentValue.trim();

	// const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
	//   const value = event.target.value
	// 	setCurrentValue(value);
	// };

	const handleValueChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setCurrentValue(value);
		},
		[]
	);

	const handleSaveClick = useCallback(() => {
		onSaveTaskTitle(trimmedCurrentValue);
		setCurrentValue('');
	}, [onSaveTaskTitle, trimmedCurrentValue]);

	const handleKeyUp = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				handleSaveClick();
			}
		},
		[handleSaveClick]
	);

	return (
		<div className={styles.TodoListCreateEditTaskForm}>
			<input
				disabled={isDisabled}
				className={styles.TextInput}
				type="text"
				placeholder="Add your todo..."
				value={currentValue}
				onChange={handleValueChange}
				onKeyUp={handleKeyUp}
			/>
			{currentValue && (
				<button
					disabled={
						!trimmedCurrentValue || currentValue === taskItemTitle || isDisabled
					}
					onClick={handleSaveClick}
					className={styles.SaveButton}
				>
					Save
				</button>
			)}
		</div>
	);
};

export default TodoListCreateEditTaskForm;
