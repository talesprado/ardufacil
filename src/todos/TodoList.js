import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { getTodos, getTodosLoading, getIncompleteTodos, getCompleteTodos } from './selectors';
import { loadTodos, completeTodoRequest, removeTodoRequest } from './thunks';


const TodoList = ({ completeTodos = [], incompleteTodos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos()
    }, []);

    const loadingMessage = <div>loading...</div>   
    const content = (
        <>
            <NewTodoForm />
            <div className="list-wrapper">
                {incompleteTodos.map(todo => <TodoListItem 
                            todo={todo} 
                            key={todo.TodoId} 
                            onRemovePressed={onRemovePressed} 
                            onCompletedPressed={onCompletedPressed}  />)}
            </div>
            <h2>{'Completed Todos'}</h2>
            <div className="list-wrapper">
                {completeTodos.map(todo => <TodoListItem 
                            todo={todo} 
                            key={todo.TodoId} 
                            onRemovePressed={onRemovePressed} 
                            onCompletedPressed={onCompletedPressed}  />)}
            </div>
        </>);
    return isLoading ? loadingMessage : content;

}
const mapStateToProps = state => ({
    isLoading: getTodosLoading( state ),
//    incompleteTodos: getIncompleteTodos( state ),
    completeTodos: getCompleteTodos( state ),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos  : () =>   dispatch(loadTodos()),
  //  onRemovePressed    : todoId => dispatch(removeTodoRequest(todoId)),
  //  onCompletedPressed : todoId => dispatch(completeTodoRequest(todoId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);