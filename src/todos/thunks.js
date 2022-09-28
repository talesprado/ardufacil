import { 
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure,
    createTodo,
    completeTodo,
    deleteTodo } from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
    try{
      //  dispatch(loadTodosInProgress());
        //const response = await fetch('http://localhost:8081/todos');
        const response = '[{"TodoId": 1, "text":\"Fazer Compras\", "isCompleted": true}]'; 
        const todos = await JSON.parse(response); //await response.json();
        dispatch(loadTodosSuccess(todos));
    }catch (e){
        dispatch(loadTodosFailure);
        dispatch(displayAlert(e))
    }
    
}

export const addTodoRequest = text => async dispatch => {
    try{
        const body = JSON.stringify({text});
        const response = await fetch('http://localhost:8081/todo/add', {
            headers : {
                'Content-Type' : 'application/json',
            },
            method: 'POST',
            body,
        });
        
        const todo = await response.json();
        dispatch(createTodo(todo));
    }catch (e) {
        displayAlert(e);
    }    
}

export const completeTodoRequest = todoId => async dispatch => {
    try{
        const response = await fetch('http://localhost:8081/todo/complete/' + todoId);
        const todo = await response.json();
        dispatch(completeTodo(todo))
    }catch (e){
        displayAlert(e);
    }
}

export const removeTodoRequest = todoId => async dispatch => {
    try{
        const response = await fetch('http://localhost:8081/todo/delete/' + todoId);
        const todos = await response.json();
        dispatch(loadTodosSuccess(todos));
    }catch (e){
        displayAlert(e);
    }
}

export const displayAlert = text => () => {
    alert(`Error: '${text}'`);
}