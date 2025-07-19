export interface Todo {
  id: number;
  title: string;
  description?: string | null;
}

export interface AddTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string | null;
}

const API_BASE = "/api/v1/todos";

// Fetch all Todos
export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
}

// Fetch a single Todo by ID
export async function fetchTodoById(id: number): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) {
    throw new Error("Todo not found");
  }
  return response.json();
}

// Add a new Todo
export async function addTodo(request: AddTodoRequest): Promise<Todo> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  return response.json();
}

// Update an existing Todo
export async function updateTodo(
  id: number,
  request: UpdateTodoRequest
): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}
