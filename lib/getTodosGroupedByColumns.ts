import { databases } from "@/appwrite/config";
import conf from "@/conf/config";
import { access } from "fs";

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    conf.databaseId!,
    conf.todosCollectionId!
  );
  const todos = data.documents;

  // grouping the todos by status ie => do, doing, done
  const columns = todos.reduce((acc: any, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,

      //get the image if it exists on the todo
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  // if columns doesnt have do,doing,done then add it with empty todos.
  const columnTypes: TypedColumn[] = ["do", "doing", "done"];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // sort columns by columnTypes
  const sortedColumns = new Map(
    (Array.from(columns.entries()) as [TypedColumn, Column][])
      .sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
  );

  const board: Board = {
    columns: sortedColumns
  }

  return board;
};
