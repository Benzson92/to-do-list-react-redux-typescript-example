import { render, screen, fireEvent } from '@testing-library/react';

import TodoListCreateEditTaskForm from '../routes/home/components/todoListCreateEditTaskForm';

test('renders TodoListCreateEditTaskForm', () => {
	const onSaveTaskTitle = jest.fn();

	render(
		<TodoListCreateEditTaskForm
			isDisabled={false}
			onSaveTaskTitle={onSaveTaskTitle}
		/>
	);

	expect(screen.getByPlaceholderText('Add your todo...')).toBeInTheDocument();
});

test('renders TodoListCreateEditTaskForm when disabled', () => {
	const onSaveTaskTitle = jest.fn();

	render(
		<TodoListCreateEditTaskForm
			isDisabled
			onSaveTaskTitle={onSaveTaskTitle}
		/>
	);

	expect(screen.getByPlaceholderText('Add your todo...')).toBeDisabled()
});

test('It should have the value when input is enabled', () => {
	const onSaveTaskTitle = jest.fn();

	render(
		<TodoListCreateEditTaskForm
			isDisabled={false}
			onSaveTaskTitle={onSaveTaskTitle}
		/>
	);

	fireEvent.change(screen.getByPlaceholderText('Add your todo...'), { target: { value: '23' } });
  expect(screen.getByPlaceholderText('Add your todo...')).toHaveValue('23')
});
