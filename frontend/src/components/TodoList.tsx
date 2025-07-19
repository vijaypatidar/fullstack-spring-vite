import React from "react";
import type {Todo} from "../api";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, title: string, description?: string | null) => void;
    isEditing: number | null;
}

const TodoList: React.FC<TodoListProps> = ({todos, onEdit, onDelete, onUpdate, isEditing}) => {
    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    <TodoItem
                        todo={todo}
                        isEditing={isEditing === todo.id}
                        onEdit={() => onEdit(todo.id)}
                        onDelete={() => onDelete(todo.id)}
                        onUpdate={onUpdate}
                    />
                </li>
            ))}
        </ul>
    );
};

export default TodoList;