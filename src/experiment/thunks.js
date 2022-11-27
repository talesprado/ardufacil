import { loadExperimentInProgress, loadExperimentSuccess, loadBoard, loadBoardSuccess, loadBoardFail, disconnectPortSuccess, prepareDisconnect } from "./actions";
import { experiment } from "./reducers";
import Board from "./serial_com";

export const loadPort = (newPort = true) => async (dispatch, getState) => {
    try{
        dispatch(loadExperimentInProgress());  
        const board = newPort ?  new Board() : getState().experiment.board ;   
        dispatch(loadBoard(board));
        let ports = await board.getAvailablePorts();
        board.availablePorts = ports;
        if(ports.length > 0){
            board.port = ports[0];
            await board.port.open({ baudRate: 9600 });
            board.port.ondisconnect= async () => {dispatch(loadBoardFail()); await dispatch(prepareDisconnect());dispatch(disconnectPort())};
            board.textDecoder = new TextDecoderStream();
            board.textEncoder = new TextEncoderStream();
            board.readableStreamClosed = board.port.readable.pipeTo(board.textDecoder.writable);   
            board.writableStreamClosed = board.textEncoder.readable.pipeTo(board.port.writable);
            await dispatch(loadBoardSuccess(board));
            
          
            navigator.serial.addEventListener("disconnect", (event) => {
                document.location.reload();
              });
        }else{
            dispatch(loadBoardFail())
        }    
    }catch (e){
        console.log(e);
        board.port.forget();
        dispatch(loadBoardFail());
    }
}

export const updateVars = (variable, newValue) => async (dispatch, getState) => {
    const currentState = getState().experiment;
    try{  
        if (currentState.isLoading){
            updateVars(variable, newValue);
        }
        dispatch(loadExperimentInProgress());
        
        await currentState.board.requestVarUpdate(variable.name, variable.type, newValue)
        const response = await currentState.board.readSerial();
        currentState.data = JSON.parse(response); 
    }catch(e){
        console.log(e);
    }
}

export const requestPort = () => async (dispatch, getState) => {
    try{
        let currentBoard = new Board();
        console.log(currentBoard);
        if (!currentBoard){
            currentBoard = new Board();
            let ports = await board.getAvailablePorts();
            currentBoard.availablePorts = ports;
        }
        if(!currentBoard.port){       
            await currentBoard.requestPort();
            dispatch(loadPort());
        }
        await dispatch(loadBoard(currentBoard));
        
    }catch(e){
        console.log(e);
        dispatch(loadBoardFail());
    }
}

export const disconnectPort = () => async (dispatch, getState) => {
    try{
        let currentBoard = new Board();
        await currentBoard.disconnect();
        dispatch(disconnectPortSuccess());
    }catch(e){
        console.log(e);
    }
}

export const requestSave = () => async (dispatch, getState) => {
    try{
        let currentBoard = getState().experiment.board;
        await currentBoard.requestSaveValue();
    }catch(e){
        console.log(e);
    }
   
}

export const requestExperiment = () => async (dispatch, getState) => {
    let currentState = getState().experiment;
    if(currentState.isBoardConnected){
        try{
            dispatch(loadExperimentInProgress());     
            await currentState.board.requestInfo();
            const response = await currentState.board.readSerial();
            currentState.data = JSON.parse(response);
            dispatch(loadExperimentSuccess(currentState.data));
        }catch(e){
            console.log('Erro ao carregar experiência: '+e);
        }
    }
}


export const displayAlert = text => () => {
    alert(`Error: '${text}'`);
}