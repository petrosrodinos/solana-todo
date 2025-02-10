import TodoList from "./TodoList";
import { FC } from "react";

const TodoSection: FC<any> = ({ title, todos, action }) => {
  console.log("TodoSection", todos);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl mb-2">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
        {title} ({todos.length})
      </h2>
      <TodoList todos={todos} action={action} />
    </div>
  );
};

export default TodoSection;
