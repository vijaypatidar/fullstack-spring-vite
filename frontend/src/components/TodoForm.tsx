import React, { useState } from "react";

interface TodoFormProps {
    onSubmit: (title: string, description?: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, description);
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;