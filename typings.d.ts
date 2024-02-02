type TypedColumn = "do" | "doing" | "done"

interface Image {
    bucketId: string;
    fileId: string;
}
interface Todo{
    $id: string;
    $createdAt: string;
    title: string;
    status: TypedColumn;
    image?: Image;
}
interface Column {
    id: TypedColumn;
    todos: Todo[];
}
interface Board {
    columns: Map<TypedColumn,Column>
}
