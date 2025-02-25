import * as anchor from "@project-serum/anchor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TODO_PROGRAM_PUBKEY } from "../constants";
import { IDL as profileIdl } from "../contract/todo";
import toast from "react-hot-toast";
import { SystemProgram } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { authorFilter } from "../utils";

export function useTodo() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const [initialized, setInitialized] = useState(false);
  const [lastTodo, setLastTodo] = useState(0);
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [transactionPending, setTransactionPending] = useState(false);

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(profileIdl, TODO_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    findProfileAccounts();
  }, [publicKey, program]); // Added `program` to dependencies

  const findProfileAccounts = async () => {
    if (program && publicKey && !transactionPending) {
      try {
        setLoading(true);
        const [profilePda] = findProgramAddressSync(
          [utf8.encode("USER_STATE"), publicKey.toBuffer()],
          program.programId
        );
        const profileAccount: any = await program.account.userProfile.fetch(profilePda);

        if (profileAccount) {
          setLastTodo(profileAccount.lastTodo);
          setInitialized(true);

          const todoAccounts: any = await program.account.todoAccount.all([
            authorFilter(publicKey.toString()),
          ]);

          setTodos([...todoAccounts]);
        } else {
          setInitialized(false);
        }
      } catch (error: any) {
        console.log(error);
        setInitialized(false);
        setTodos([]);
        setError("Failed to fetch profile accounts.");
      } finally {
        setLoading(false);
      }
    }
  };

  const initializeUser = useCallback(async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [profilePda] = findProgramAddressSync(
          [utf8.encode("USER_STATE"), publicKey.toBuffer()],
          program.programId
        );

        const tx = await program.methods
          .initializeUser()
          .accounts({
            userProfile: profilePda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        setInitialized(true);
        toast.success("Successfully initialized user.");
        window.location.reload();
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        setError("Failed to initialize user.");
      } finally {
        setTransactionPending(false);
      }
    }
  }, [program, publicKey]); // Added missing dependencies

  const addTodo = useCallback(
    async (content: string) => {
      if (program && publicKey) {
        try {
          setTransactionPending(true);

          const [profilePda] = findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );
          const [todoPda] = findProgramAddressSync(
            [utf8.encode("TODO_STATE"), publicKey.toBuffer(), Uint8Array.from([lastTodo])],
            program.programId
          );

          if (!content.trim()) {
            setTransactionPending(false);
            toast.error("Todo cannot be empty.");
            return;
          }

          await program.methods
            .addTodo(content)
            .accounts({
              userProfile: profilePda,
              todoAccount: todoPda,
              authority: publicKey,
              systemProgram: SystemProgram.programId,
            })
            .rpc();
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
          setError("Failed to add todo.");
        } finally {
          setTransactionPending(false);
        }
      }
    },
    [program, publicKey, lastTodo]
  ); // Added missing dependencies

  const markTodo = useCallback(
    async (todoPda: any, todoIdx: any) => {
      if (program && publicKey) {
        try {
          setTransactionPending(true);
          const [profilePda] = findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          await program.methods
            .markTodo(todoIdx)
            .accounts({
              userProfile: profilePda,
              todoAccount: todoPda,
              authority: publicKey,
              systemProgram: SystemProgram.programId,
            })
            .rpc();
          toast.success("Successfully marked todo.");
          window.location.reload();
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
          setError("Failed to mark todo.");
        } finally {
          setTransactionPending(false);
        }
      }
    },
    [program, publicKey]
  ); // Added missing dependencies

  const removeTodo = useCallback(
    async (todoPda: any, todoIdx: any) => {
      if (program && publicKey) {
        try {
          setTransactionPending(true);
          const [profilePda] = findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          await program.methods
            .removeTodo(todoIdx)
            .accounts({
              userProfile: profilePda,
              todoAccount: todoPda,
              authority: publicKey,
              systemProgram: SystemProgram.programId,
            })
            .rpc();
          toast.success("Successfully removed todo.");
          window.location.reload();
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
          setError("Failed to remove todo.");
        } finally {
          setTransactionPending(false);
        }
      }
    },
    [program, publicKey]
  ); // Added missing dependencies

  const incompleteTodos = useMemo(() => todos.filter((todo: any) => !todo.account.marked), [todos]);
  const completedTodos = useMemo(() => todos.filter((todo: any) => todo.account.marked), [todos]);

  return {
    initialized,
    initializeUser,
    loading,
    transactionPending,
    completedTodos,
    incompleteTodos,
    addTodo,
    markTodo,
    removeTodo,
    error,
  };
}
