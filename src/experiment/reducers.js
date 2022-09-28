import { LOAD_EXPERIMENT_IN_PROGRESS, LOAD_EXPERIMENT_SUCCESS, UPDATE_VARS, LOAD_BOARD_SUCCESS } from "./actions";

const initialState = {isLoading : false, data: [] };

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
                board: board
            }
        }
        
        default: 
            return state;
    }
}