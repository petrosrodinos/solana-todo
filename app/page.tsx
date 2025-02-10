"use client";
import styles from "./styles/Home.module.css";
import Loading from "./components/Loading";
import TodoSection from "./components/Todo/TodoSection";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useTodo } from "./hooks/todo";
import { useState } from "react";

export default function Home() {
  const {
    initialized,
    initializeUser,
    loading,
    transactionPending,
    completedTodos,
    incompleteTodos,
    addTodo,
    markTodo,
    removeTodo,
  } = useTodo();

  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionsContainer}>
        {initialized ? (
          <div className={styles.todoInput}>
            <div className={`${styles.todoCheckbox} ${styles.checked}`} />
            <div className={styles.inputContainer}>
              <input
                value={input}
                onChange={handleChange}
                id={styles.inputField}
                type="text"
                placeholder="Create a new todo..."
              />
              <button onClick={() => addTodo(input)} className={styles.addTodoButton}>
                Add
              </button>
            </div>
            <div className={styles.iconContainer}></div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.button}
            onClick={() => initializeUser()}
            disabled={transactionPending}
          >
            Initialize
          </button>
        )}
        <WalletMultiButton />
      </div>

      <div className={styles.mainContainer}>
        <Loading loading={loading}>
          <TodoSection title="Tasks" todos={incompleteTodos} action={markTodo} />

          <TodoSection title="Completed" todos={completedTodos} action={removeTodo} />
        </Loading>
      </div>
    </div>
  );
}
