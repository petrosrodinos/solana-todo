import { CalendarIcon, TrashIcon } from "@heroicons/react/16/solid";
import { FC } from "react";

const TodoItem: FC<any> = ({ idx, content, marked, dateline, publicKey, action }) => {
  const handleMarkTodo = () => {
    if (marked) return;
    action(publicKey, idx);
  };

  const handleRemoveTodo = () => {
    action(publicKey, idx);
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
      <div
        onClick={handleMarkTodo}
        className={`w-6 h-6 border-2 rounded-full cursor-pointer transition ${
          marked ? "bg-green-500 border-green-500" : "border-gray-400"
        }`}
      />
      <div className="flex-1 ml-4">
        <span className={`text-lg ${marked ? "line-through text-gray-500" : "text-gray-800"}`}>
          {content}
        </span>
        {dateline && (
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{dateline}</span>
          </div>
        )}
      </div>
      <button onClick={handleRemoveTodo} className="text-red-500 hover:text-red-700 transition">
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TodoItem;
