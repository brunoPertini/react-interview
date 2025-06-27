import React, { useEffect } from "react";
import { ToDoClient } from "./http_clients/TodoClient";
import TodoList from "./TodoList";
import { TodoItem } from "./types/shared";

const todoClient = new ToDoClient();

function App() {
  const [items, setItems] = React.useState<TodoItem[]>([]);

  const fetchTodos = async () => {
    try {
      const todos = await todoClient.getTodos();
      setItems([...todos]);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleItemAdd = async (item: string) => {
    try {
      await todoClient.addTodo(item);
      await fetchTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }

  const handleItemUpdate = async (id: number, newValue: string) => {
    try {
      await todoClient.updateTodo(id, newValue);
      await fetchTodos();
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to add todo:", error);
      return Promise.reject(error);
    }
  }

  const handleItemDelete = async (id: number) => {
    try {
      await todoClient.deleteTodo(id);
      await fetchTodos();
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to delete todo:", error);
      return Promise.reject(error);
    }
  }

  const handleSetCompleted = async (id: number, isCompleted: boolean) => {
    try {
      await todoClient.completeTodo(id, isCompleted);
      await fetchTodos();
    } catch (error) {
      console.error("Failed to complete todo:", error);
    }
  }

  return (
    <>
      <TodoList items={items}
        onItemAdd={handleItemAdd}
        handleItemUpdate={handleItemUpdate}
        handleItemDelete={handleItemDelete}
        handleSetCompleted={handleSetCompleted}/>
    </>
  )
}

export default App