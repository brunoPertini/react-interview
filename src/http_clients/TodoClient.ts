import { TodoItem } from "../types/shared";
import { HttpClient } from "./HttpClient";
import { NewToDoItemDTO, UpdateToDoItemDTO } from "./types";

export class ToDoClient extends HttpClient {
    private apiBasePath:string = "api/todolists"

    constructor() {
        super("http://localhost:3000");
    }   
    async getTodos(): Promise<TodoItem[]> { 
        return this.get<TodoItem[]>(this.apiBasePath);
    }

    async addTodo(item: string): Promise<TodoItem> {
        return this.post<TodoItem, NewToDoItemDTO>(this.apiBasePath, { name: item });
    }

    async updateTodo(id: number, item: string): Promise<TodoItem> {
       return this.put<TodoItem, UpdateToDoItemDTO>(`${this.apiBasePath}/${id}`, { name: item });
    }

    async deleteTodo(id: number): Promise<void> {
        return this.delete<void>(`${this.apiBasePath}/${id}`);
    }

    async completeTodo(id: number, isCompleted: boolean): Promise<TodoItem> {
        return this.patch<TodoItem, { isCompleted: boolean }>(`${this.apiBasePath}/${id}`, { isCompleted });
    }   
}