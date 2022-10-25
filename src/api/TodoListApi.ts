import clientApi from './ClientApiService';
import { TaskDTO } from '../models/TaskDTO';

const BASE_API_URL = 'todos';

export const fetchTodos = async () =>
	await clientApi.get<TaskDTO[]>(BASE_API_URL);

export const createTodo = async (task: TaskDTO) =>
	await clientApi.post<TaskDTO, TaskDTO>(BASE_API_URL, task);

export const updateTodo = async (id: string, task: Partial<TaskDTO>) =>
	await clientApi.patch<Partial<TaskDTO>, TaskDTO>(
		`${BASE_API_URL}/${id}`,
		task
	);

export const deleteTodo = async (id: string) =>
	await clientApi.delete<{}>(`${BASE_API_URL}/${id}`);
