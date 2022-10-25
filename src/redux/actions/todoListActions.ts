import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	fetchTodos,
	createTodo,
	updateTodo,
	deleteTodo,
} from '../../api/TodoListApi';
import { TaskDTO } from '../../models/TaskDTO';

export const fetchTodoList = createAsyncThunk<TaskDTO[]>(
	'todoList/fetchTodoList',
	async () => await fetchTodos()
);

export const createTodoListTask = createAsyncThunk<TaskDTO, string>(
	'todoList/createTodoListTask',
	async (title) => {
		const id = new Date().getTime().toString();
		const task: TaskDTO = {
			id,
			completed: false,
			title,
		};

		return await createTodo(task);
	}
);

export const updateTodoListTask = createAsyncThunk<TaskDTO, Partial<TaskDTO> & Pick<TaskDTO, 'id'>>(
	'todoList/updateTodoListTask',
	async (task) => await updateTodo(task.id, task)
);

export const deleteTodoListTask = createAsyncThunk<{}, string>(
	'todoList/deleteTodoListTask',
	async (id) => await deleteTodo(id)
);
