export const LOAD_EXPERIMENT_SUCCESS = 'LOAD_EXPERIMENT_SUCCESS';
export const loadExperimentSuccess = experiment => ({
    type: LOAD_EXPERIMENT_SUCCESS,
    payload:  { experiment } ,
});

export const LOAD_EXPERIMENT_IN_PROGRESS = 'LOAD_EXPERIMENT_IN_PROGRESS';
export const loadExperimentInProgress = () => ({
    type: LOAD_EXPERIMENT_IN_PROGRESS
});

export const UPDATE_VARS = 'UPDATE_VARS';
export const updateVars = vars => ({
    type: UPDATE_VARS,
    payload: { vars },
});

export const LOAD_BOARD_SUCCESS = 'LOAD_BOARD_SUCCESS';
export const loadBoardSuccess = board => ({
    type: LOAD_BOARD_SUCCESS,
    payload: { board }
});

export const REQUEST_PORT = 'REQUEST_PORT';
export const requestPort = () => ({
    type: REQUEST_PORT
})