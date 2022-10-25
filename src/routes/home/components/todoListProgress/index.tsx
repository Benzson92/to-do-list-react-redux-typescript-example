import React from 'react';

import styles from './index.module.scss';

type Props = {
  completedTaskAmount: number;
  totalTaskAmount: number;
};

const TodoListProgress: React.FunctionComponent<Props> = ({ completedTaskAmount, totalTaskAmount }) => {
  const currentProgressPercentage = ((completedTaskAmount / totalTaskAmount) * 100) || 0;

  return (
    <div className={styles.TodoListProgress}>
      <div className={styles.Title}>Progress</div>
      <div className={styles.ProgressBar}>
        <div title="Current Progress" className={styles.CurrentProgress} style={{ width: `${currentProgressPercentage}%` }} />
      </div>
      <div className={styles.NumberOfCompletedTasks}>
        {`${completedTaskAmount} completed`}
      </div>
    </div>
  )
}

export default TodoListProgress;
