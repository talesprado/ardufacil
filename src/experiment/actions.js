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

export const SAVE_VALUES = 'SAVE_VALUES';
export const saveValues = () => ({
    type: SAVE_VALUES
});

export const PREPARE_DISCONNECT = 'PREPARE_DISCONNECT';
export const prepareDisconnect = () => ({
    type: PREPARE_DISCONNECT
});

export const LOAD_BOARD = 'LOAD_BOARD';
export const loadBoard  = board => ({
    type: LOAD_BOARD,
    payload: { board }
});

export const LOAD_BOARD_SUCCESS = 'LOAD_BOARD_SUCCESS';
export const loadBoardSuccess = board => ({
    type: LOAD_BOARD_SUCCESS,
    payload: { board }
});

export const LOAD_BOARD_FAIL = 'LOAD_BOARD_FAIL';
export const loadBoardFail = () => ({
    type: LOAD_BOARD_FAIL
});

export const DISCONNECT_PORT_SUCCESS = 'DISCONNECT_PORT_SUCCESS';
export const disconnectPortSuccess = () => ({
    type: DISCONNECT_PORT_SUCCESS
});

export const REQUEST_PORT = 'REQUEST_PORT';
export const requestPort = () => ({
    type: REQUEST_PORT
});

export const REQUEST_EXPERIMENT = 'REQUEST_EXPERIMENT';
export const requestExperiment = () => ({
    type: REQUEST_EXPERIMENT
})