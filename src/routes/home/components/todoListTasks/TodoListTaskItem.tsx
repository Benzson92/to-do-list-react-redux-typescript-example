import React from 'react';

import { TaskDTO } from '../../../../models/TaskDTO';

import TodoListTaskCheckIcon from './icons/TodoListTaskCheckIcon';

import styles from './TodoListTaskItem.module.scss';

type Props = {
	task: TaskDTO;
	onClickIsCompletedTaskItem: () => void;
	renderTaskItemMenu: () => React.ReactElement;
};

const TodoListTaskItem: React.FunctionComponent<Props> = ({
	task: { title, completed },
	onClickIsCompletedTaskItem,
	renderTaskItemMenu,
}) => {
	return (
		<div className={styles.TodoListTaskItem}>
			<div className={styles.TodoListTaskLeftContent}>
				<div
					onClick={onClickIsCompletedTaskItem}
					title="Checkbox"
					className={`${styles.Checkbox} ${
						completed ? styles.CheckboxCompleted : ''
					}`}
				>
					{completed && <TodoListTaskCheckIcon />}
				</div>
				<div
					data-testid="TodoListTaskItemTitle"
					className={`${styles.Title} ${
						completed ? styles.TitleCompleted : ''
					}`}
				>
					{title}
				</div>
			</div>
			{renderTaskItemMenu()}
		</div>
	);
};

function todoListTaskItemPropsAreEqual({ task: prevTask }: Props, { task: nextTask }: Props) {
  return prevTask.title === nextTask.title
    && prevTask.completed === nextTask.completed;
}

export default React.memo(TodoListTaskItem, todoListTaskItemPropsAreEqual);
