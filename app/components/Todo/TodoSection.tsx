import TodoList from "./TodoList";
import { FC } from "react";

const TodoSection: FC<any> = ({ title, todos, onRemove, onMark }) => {
  console.log("TodoSection", todos);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl mb-2">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
        {title} ({todos.length})
      </h2>

      {todos.length > 0 ? (
        <TodoList todos={todos} onRemove={onRemove} onMark={onMark} />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 py-6">
          <span className="text-3xl">📃</span>
          <p className="mt-2 text-lg font-medium">No todos found</p>
          <p className="text-sm text-gray-400">Add a new task to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TodoSection;
