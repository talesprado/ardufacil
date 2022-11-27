import { REGISTER } from "redux-persist";
import { LOAD_EXPERIMENT_IN_PROGRESS, 
         LOAD_EXPERIMENT_SUCCESS, 
         UPDATE_VARS, 
         LOAD_BOARD,
         LOAD_BOARD_SUCCESS, 
         LOAD_BOARD_FAIL, 
         DISCONNECT_PORT_SUCCESS,
         PREPARE_DISCONNECT } from "./actions";

const initialState = {isLoading : false, keepReading: true, isBoardConnected: false, data: [] };

export const experiment = ( state = initialState, action ) => {
    const {type, payload} = action;

    switch (type){
        case LOAD_EXPERIMENT_IN_PROGRESS: {            
            return {
                ...state,
                isLoading: true
            }
        }
        case LOAD_EXPERIMENT_SUCCESS: {
            const {experiment} = payload;
            return {
                ...state,
                isLoading : false,
                data: experiment
            }
        }
        case LOAD_BOARD_SUCCESS:{
            const {board} = payload;
            return {
                ...state,
                isLoading: false,
                isBoardConnected: true,
                board: board
            }
        }
        case LOAD_BOARD_FAIL:{
            return {
                ...state,
                isLoading: false,
                isBoardConnected: false
            }
        }
        case LOAD_BOARD:{
            const {board} = payload;
            return {
                ...state,
                board: board
            }
        }
        
        case PREPARE_DISCONNECT:{
            return {
                ...state,
                keepReading: false
            }
        }

        case DISCONNECT_PORT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isBoardConnected: false
            }
        }
        
        default: 
            return state;
    }
}