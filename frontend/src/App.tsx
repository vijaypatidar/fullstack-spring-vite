import { useEffect, useState } from "react";
import { addTodo, deleteTodo, fetchTodos, type Todo, updateTodo } from "./api";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (title: string, description?: string) => {
    try {
      const newTodo = await addTodo({ title, description });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  const handleUpdateTodo = async (
    id: number,
    title: string,
    description?: string | null
  ) => {
    try {
      await updateTodo(id, { title, description });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title, description } : todo
        )
      );
      setIsEditing(null);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onSubmit={handleAddTodo} />
      <TodoList
        todos={todos}
        onEdit={(id) => setIsEditing(id)}
        onDelete={handleDeleteTodo}
        onUpdate={handleUpdateTodo}
        isEditing={isEditing}
      />
    </div>
  );
}

export default App;
