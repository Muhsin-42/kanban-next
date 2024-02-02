type TypedColumn = "do" | "doing" | "done";
type PriorityType = "low" | "medium" | "high";

interface Todo {
  $id?: string;
  $createdAt?: string;
  title: string;
  userId?: string;
  description?: string;
  status?: TypedColumn;
  image?: Image;
  dueDate: Date;
  priority?: PriorityType;
}

interface Image {
  bucketId: string;
  fileId: string;
}
interface Column {
  id: TypedColumn;
  todos: Todo[];
}
interface Board {
  columns: Map<TypedColumn, Column>;
}
