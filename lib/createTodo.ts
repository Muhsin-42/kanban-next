import { databases } from "@/appwrite/config";
import conf from "@/conf/config";
import { ID } from "appwrite";

export default function createTodo(task: Todo, userId: string) {
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
}
