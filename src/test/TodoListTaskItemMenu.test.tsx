import { render, screen, fireEvent } from '@testing-library/react';

import TodoListTaskItemMenu from '../routes/home/components/todoListTasks/TodoListTaskItemMenu';

test('open TodoListTaskItemMenu Dropdown Menu', () => {
	const onClickEditTaskItem = jest.fn();
	const onClickDeleteTaskItem = jest.fn();

	render(
		<TodoListTaskItemMenu
			onClickEditTaskItem={onClickEditTaskItem}
			onClickDeleteTaskItem={onClickDeleteTaskItem}
		/>
	);

	fireEvent.click(screen.getByRole('button'));

	expect(screen.getByText('Edit')).toBeInTheDocument();
	expect(screen.getByText('Delete')).toBeInTheDocument();
});
