"use client";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Create from "./components/Todo/Create";
import TodoSection from "./components/Todo/TodoSection";
import { useTodo } from "./hooks/todo";
import DisabledWrapper from "./components/DisabledWrapper";

export default function Home() {
  const { loading, completedTodos, incompleteTodos, transactionPending, markTodo, removeTodo } =
    useTodo();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <Header />

      <Create />

      <div className="w-full max-w-xl mt-6">
        <Loading loading={loading} />
        {!loading && (
          <DisabledWrapper loading={transactionPending}>
            <TodoSection
              title="Tasks"
              todos={incompleteTodos}
              onRemove={removeTodo}
              onMark={markTodo}
            />
            <TodoSection title="Completed" todos={completedTodos} onRemove={removeTodo} />
          </DisabledWrapper>
        )}
      </div>
      <Toaster />
    </div>
  );
}
