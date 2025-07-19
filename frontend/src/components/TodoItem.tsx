// src/components/TodoItem.tsx

import React, {useState} from "react";
import type {Todo} from "../api";

interface TodoItemProps {
    todo: Todo;
    isEditing: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onUpdate: (id: number, title: string, description?: string | null) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, isEditing, onEdit, onDelete, onUpdate}) => {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleUpdate = () => {
        onUpdate(todo.id, title, description);
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default TodoItem;