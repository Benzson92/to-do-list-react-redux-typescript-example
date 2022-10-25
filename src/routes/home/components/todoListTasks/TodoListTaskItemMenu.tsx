import React, { useState } from 'react';

import TodoListTaskMenuIcon from './icons/TodoListTaskMenuIcon';

import styles from './TodoListTaskItemMenu.module.scss';

type Props = {
	onClickEditTaskItem: () => void;
  onClickDeleteTaskItem: () => void;
};

const TodoListTaskItemMenu: React.FunctionComponent<Props> = ({
	onClickEditTaskItem,
	onClickDeleteTaskItem,
}) => {
	const [open, setOpen] = useState(false);

	const taskItemMenuList = [
		{ title: 'Edit', onClick: onClickEditTaskItem, className: styles.EditButton },
		{ title: 'Delete', onClick: onClickDeleteTaskItem, className: styles.DeleteButton },
	];

	const handleToggleMenuButton = () => {
		setOpen((prevState) => !prevState);
	};

	return (
		<div className={styles.TodoListTaskItemMenu}>
			<button
				onClick={handleToggleMenuButton}
				className={styles.MenuButton}
			>
				<TodoListTaskMenuIcon />
			</button>
			{open && (
				<div className={styles.DropdownMenu}>
					{taskItemMenuList.map(({ title, onClick, className }) => {
						return (
							<div
								key={title}
								onClick={onClick}
								className={`${styles.DropdownMenuItem} ${className}`}
							>
								{title}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default TodoListTaskItemMenu;
