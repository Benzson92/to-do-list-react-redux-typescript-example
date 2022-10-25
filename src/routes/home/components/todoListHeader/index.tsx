import React from 'react';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

const TodoListHeader: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={styles.TodoListHeader}>
      <div className={styles.Title}>Tasks</div>
      {children}
    </div>
  );
};

export default TodoListHeader;
