import { databases } from "@/appwrite/config";


export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TOOLS_COLLECTION_ID!
    ); 
    console.log('data ',data)
    const todos = data.documents;
    
    const columns = todos.reduce((acc:any, todo) =>{
        if(!acc.get(todo.status)){
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            } )
        }
    }, new Map<TypedColumn, Column>)
}