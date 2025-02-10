import { FC } from "react";
import TodoItem from "./TodoItem";

const TodoList: FC<any> = ({ todos, onRemove, onMark }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo: any) => (
        <TodoItem
          key={todo.account.idx}
          {...todo.account}
          publicKey={todo.publicKey}
          onRemove={onRemove}
          onMark={onMark}
        />
      ))}
    </ul>
  );
};

export default TodoList;
