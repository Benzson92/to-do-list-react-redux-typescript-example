import { render, screen } from '@testing-library/react';

import TodoListProgress from '../routes/home/components/todoListProgress';

test('renders TodoListProgress 1/2 completed', () => {
	render(
		<TodoListProgress
			completedTaskAmount={1}
			totalTaskAmount={2}
		/>
	);

	expect(screen.getByTitle('Current Progress')).toHaveStyle(
		'width: 50%'
	);
	expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('renders TodoListProgress 0/0 completed', () => {
	render(
		<TodoListProgress
			completedTaskAmount={0}
			totalTaskAmount={0}
		/>
	);

	expect(screen.getByTitle('Current Progress')).toHaveStyle(
		'width: 0%'
	);
	expect(screen.getByText('0 completed')).toBeInTheDocument();
});
