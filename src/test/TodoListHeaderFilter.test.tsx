import { render, screen, fireEvent } from '@testing-library/react';

import { TaskType } from '../types/TaskType';

import TodoListHeaderFilter from '../routes/home/components/todoListHeader/TodoListHeaderFilter';

import styles from '../routes/home/components/todoListHeader/TodoListHeaderFilter.module.scss';

test('open TodoListHeaderFilter Dropdown Menu', () => {
	const setState = jest.fn();

	render(
		<TodoListHeaderFilter
			isDisabled={false}
			currentValue={TaskType.All}
			setCurrentValue={setState}
		/>
	);

	fireEvent.click(screen.getByRole('button'));

	const alls = screen.getAllByText(TaskType.All);

	expect(alls[0]).toBeInTheDocument();
	expect(alls[1]).toBeInTheDocument();

	expect(screen.getByText(TaskType.Done)).toBeInTheDocument();
	expect(screen.getByText(TaskType.Undone)).toBeInTheDocument();

	expect(screen.getByTitle('Down Arrow Icon')).toHaveClass(styles.ActiveTodoListHeaderDownArrowIcon);
});
