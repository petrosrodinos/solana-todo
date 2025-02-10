import styles from "../../styles/Todo.module.css";
import TodoItem from "./TodoItem";
import { FC } from "react";

const TodoList: FC<any> = ({ todos, action }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo: any) => (
        <TodoItem
          key={todo.account.idx}
          {...todo.account}
          publicKey={todo.publicKey}
          action={action}
        />
      ))}
    </ul>
  );
};

export default TodoList;
