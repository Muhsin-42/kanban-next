export interface Itodo{
    id: string,
    task: string,
    description: string,
    status: string
}

export interface ITodoSection {
    id: string;
    status: string;
    name: string;
    list: Itodo[];
}
