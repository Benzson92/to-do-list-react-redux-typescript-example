import { render, screen, fireEvent } from '@testing-library/react';

import { TaskDTO } from '../models/TaskDTO';

import TodoListTaskItem from '../routes/home/components/todoListTasks/TodoListTaskItem';

import styles from '../routes/home/components/todoListTasks/TodoListTaskItem.module.scss';

test('renders completed TodoListTaskItem', () => {
	const task: TaskDTO = {
		id: '1',
		title: 'test',
		completed: true,
	};

	const onClickIsCompletedTaskItem = jest.fn();
	const renderTaskItemMenu = jest.fn();

	render(
		<TodoListTaskItem
			task={task}
			onClickIsCompletedTaskItem={onClickIsCompletedTaskItem}
			renderTaskItemMenu={renderTaskItemMenu}
		/>
	);

	expect(screen.getByTitle('Checkbox')).toHaveClass(styles.CheckboxCompleted);
	expect(screen.getByTestId('TodoListTaskItemTitle')).toHaveClass(styles.TitleCompleted);
});

test('TodoListTaskItem Checkbox onClickIsCompletedTaskItem', () => {
	const task: TaskDTO = {
		id: '1',
		title: 'test',
		completed: false,
	};

	const onClickIsCompletedTaskItem = jest.fn();
	const renderTaskItemMenu = jest.fn();

	render(
		<TodoListTaskItem
			task={task}
			onClickIsCompletedTaskItem={onClickIsCompletedTaskItem}
			renderTaskItemMenu={renderTaskItemMenu}
		/>
	);

	fireEvent.click(screen.getByTitle('Checkbox'));
	expect(onClickIsCompletedTaskItem).toHaveBeenCalledTimes(1);
});
