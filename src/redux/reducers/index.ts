import { combineReducers } from 'redux';

import todoListReducer from './todoListReducer';

const rootReducer = combineReducers({
  todoList: todoListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
