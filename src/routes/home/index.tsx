import React, { useState, useEffect, useCallback } from 'react';
import { shallowEqual } from 'react-redux';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
	fetchTodoList,
	createTodoListTask,
	updateTodoListTask,
	deleteTodoListTask,
} from '../../redux/actions/todoListActions';
import { selectTodoList } from '../../redux/reducers/todoListReducer';

import { TaskType } from '../../types/TaskType';
import { TaskDTO } from '../../models/TaskDTO';

import TodoListProgress from './components/todoListProgress';
import TodoListHeader from './components/todoListHeader';
import TodoListHeaderFilter from './components/todoListHeader/TodoListHeaderFilter';
import TodoListTasks from './components/todoListTasks';
import TodoListTaskItem from './components/todoListTasks/TodoListTaskItem';
import TodoListTaskItemMenu from './components/todoListTasks/TodoListTaskItemMenu';
import TodoListCreateEditTaskForm from './components/todoListCreateEditTaskForm';

import styles from './index.module.scss';

const TodoListHomeViewPage: React.FunctionComponent = () => {
	const todoList = useAppSelector(selectTodoList, shallowEqual);
	const dispatch = useAppDispatch();

	const [currentTaskFilter, setCurrentTaskFilter] = useState(TaskType.All);
	const [activeEditTaskFormItemId, setActiveEditTaskFormItemId] = useState('');

	const { tasks, status, error } = todoList;

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTodoList());
		}
	}, [status, dispatch]);

	const taskCategories: Record<TaskType, TaskDTO[]> = React.useMemo(
		() => ({
			[TaskType.All]: tasks,
			[TaskType.Done]: tasks.filter(({ completed }) => completed),
			[TaskType.Undone]: tasks.filter(({ completed }) => !completed),
		}),
		[tasks]
	);

	const onCreateTodoListTaskItem = useCallback(
		(taskTitle: string) => {
			dispatch(createTodoListTask(taskTitle));
		},
		[dispatch]
	);

	const onUpdateTodoListTaskItemIsCompleted = useCallback(
		({ id, completed }: TaskDTO) => {
			dispatch(updateTodoListTask({ id, completed: !completed }));
		},
		[dispatch]
	);

	const onUpdateTodoListTaskItemTitle = useCallback(
		(taskTitle: string) => {
			dispatch(
				updateTodoListTask({ id: activeEditTaskFormItemId, title: taskTitle })
			);
			if (status === 'succeeded') setActiveEditTaskFormItemId('');
		},
		[activeEditTaskFormItemId, dispatch, status]
	);

	// To do more: confirmation dialog before task deletion
	const onDeleteTodoListTaskItem = useCallback(
		(id: string) => {
			dispatch(deleteTodoListTask(id));
		},
		[dispatch]
	);

	const handleClickEditTaskItem = (id: string) => {
		setActiveEditTaskFormItemId(id);
	};

	return (
		<div className={styles.TodoListHomeViewPage}>
			<div className={styles.TodoListContainer}>
				<TodoListProgress
					completedTaskAmount={taskCategories.Done.length}
					totalTaskAmount={taskCategories.All.length}
				/>
				{error?.message && (
					<div className={styles.TodoListError}>
						{`Sorry, an unexpected error occurred: ${error.message}`}
					</div>
				)}
				<TodoListHeader>
					<TodoListHeaderFilter
						isDisabled={status === 'loading'}
						currentValue={currentTaskFilter}
						setCurrentValue={setCurrentTaskFilter}
					/>
				</TodoListHeader>
				<TodoListTasks
					isDisabled={status === 'loading'}
					data={taskCategories[currentTaskFilter]}
					keyExtractor={(item) => item.id}
					renderItem={(item) =>
						activeEditTaskFormItemId === item.id ? (
							<TodoListCreateEditTaskForm
								isDisabled={status === 'loading'}
								onSaveTaskTitle={onUpdateTodoListTaskItemTitle}
								taskItemTitle={item.title}
							/>
						) : (
							<TodoListTaskItem
								task={item}
								onClickIsCompletedTaskItem={() =>
									onUpdateTodoListTaskItemIsCompleted(item)
								}
								renderTaskItemMenu={() => (
									<TodoListTaskItemMenu
										onClickEditTaskItem={() => handleClickEditTaskItem(item.id)}
										onClickDeleteTaskItem={() =>
											onDeleteTodoListTaskItem(item.id)
										}
									/>
								)}
							/>
						)
					}
					renderCreateEditTaskForm={() => (
						<TodoListCreateEditTaskForm
							isDisabled={status === 'loading'}
							onSaveTaskTitle={onCreateTodoListTaskItem}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default TodoListHomeViewPage;
