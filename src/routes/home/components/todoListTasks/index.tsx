import React from 'react';

import styles from './index.module.scss';

type Props<ItemT> = {
  isDisabled: boolean;
  data: ReadonlyArray<ItemT>;
  keyExtractor: (item: ItemT, index?: number) => string;
  renderItem: (item: ItemT) => React.ReactElement;
  renderCreateEditTaskForm: () => React.ReactElement;
};

const TodoListTasks = <ItemT,>(props: Props<ItemT>) => {
  return (
    <div className={`${styles.TodoListTasks} ${
      props.isDisabled ? 'disabled' : ''
    }`}>
      {props.data.map((item, index) => (
        <div
          key={props.keyExtractor(item, index)}
          className={styles.TodoListTaskItemContainer}
        >
          {props.renderItem(item)}
        </div>
      ))}
      {props.renderCreateEditTaskForm()}
    </div>
  );
};

export default TodoListTasks;
