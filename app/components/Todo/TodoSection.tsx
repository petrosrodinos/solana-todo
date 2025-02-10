import styles from "../../styles/Todo.module.css";
import TodoList from "./TodoList";
import { FC } from "react";

const TodoSection: FC<any> = ({ title, todos, action }) => {
  console.log("TodoSection", todos);
  return (
    <div className={styles.todoSection}>
      <h1 className="title">
        {title} - {todos.length}
      </h1>

      <TodoList todos={todos} action={action} />
    </div>
  );
};

export default TodoSection;
