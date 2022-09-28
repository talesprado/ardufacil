import React from 'react';

const TodoListItem = ( {todo, onRemovePressed, onCompletedPressed }) => 
    (
    <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <div className="buttons-container">
            <button
                onClick={() => onCompletedPressed(todo.TodoId)}
                disabled={todo.isCompleted}
                className="completed-button">Mark as completed</button>
            <button 
                onClick = {() => onRemovePressed(todo.TodoId)}
                className="remove-button">Remove</button>
        </div>
    </div>
);

export default TodoListItem;