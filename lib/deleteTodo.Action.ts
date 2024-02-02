import { databases } from "@/appwrite/config";
import conf from "@/conf/config";

export const deleteTodoAction = (todoId: string) => {
  databases.deleteDocument(conf.databaseId, conf.todosCollectionId, todoId);
};
