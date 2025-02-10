import { useTodo } from "@/app/hooks/todo";
import React, { useState } from "react";

const Create = () => {
  const { initialized, initializeUser, transactionPending, addTodo } = useTodo();
  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">
      {initialized ? (
        <div className="flex items-center space-x-4 border-b pb-4">
          <div className="w-6 h-6 rounded-full border border-gray-400"></div>
          <div className="flex-grow flex items-center space-x-2">
            <input
              value={input}
              onChange={handleChange}
              type="text"
              placeholder="Create a new todo..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => addTodo(input)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          onClick={() => initializeUser()}
          disabled={transactionPending}
        >
          Initialize
        </button>
      )}
    </div>
  );
};

export default Create;
