import { databases } from "@/appwrite/config";
import conf from "@/conf/config";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumns";
import { ID } from "appwrite";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateStatusInDb: (todoId: string, columnId: TypedColumn) => void;
  createTodoInDb: (task: Todo, userId: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateStatusInDb: async (todoId, columnId) => {
    await databases.updateDocument(
      conf.databaseId,
      conf.todosCollectionId,
      todoId,
      {
        status: columnId,
      }
    );
  },
  createTodoInDb: async (task: Todo, userId: string) => {
    const payload = {
      title: task.title,
      status: "do",
      priority: task.priority,
      userId: userId,
      dueDate: task.dueDate,
      description: task.description,
    };
    databases.createDocument(
      conf.databaseId,
      conf.todosCollectionId,
      ID.unique(),
      payload
    );
  },
}));
