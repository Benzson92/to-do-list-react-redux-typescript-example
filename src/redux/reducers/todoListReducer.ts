import {
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';

import { RootState } from '../store';
import { TaskDTO } from '../../models/TaskDTO';
import { StatusType } from '../../types/StatusType';
import {
  fetchTodoList,
  createTodoListTask,
  updateTodoListTask,
  deleteTodoListTask,
} from '../actions/todoListActions';

interface TodoListReduxStateDTO {
  tasks: TaskDTO[];
  status: StatusType;
  error: SerializedError;
}

const initialState: TodoListReduxStateDTO = {
  tasks: [],
  status: 'idle',
  error: {},
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        tasks: action.payload,
        error: {},
      }))
      .addCase(fetchTodoList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })

      .addCase(createTodoListTask.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createTodoListTask.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        tasks: [...state.tasks, action.payload],
        error: {},
      }))
      .addCase(createTodoListTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })

      .addCase(updateTodoListTask.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateTodoListTask.fulfilled, (state, action) => {
        const { id } = action.payload

        const updatedTasks = state.tasks.map((item) => {
          if (item.id === id) {
            return { ...item, ...action.payload };
          }

          return item;
        });

        return {
          ...state,
          status: 'succeeded',
          tasks: updatedTasks,
          error: {},
        };
      })
      .addCase(updateTodoListTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })

      .addCase(deleteTodoListTask.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteTodoListTask.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        tasks: state.tasks.filter((item) => item.id !== action.meta.arg),
        error: {},
      }))
      .addCase(deleteTodoListTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
  },
});

export const selectTodoList = (state: RootState) => state.todoList;

export default todoListSlice.reducer;
