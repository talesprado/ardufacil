import { loadExperimentInProgress, loadExperimentSuccess, loadBoardSuccess } from "./actions";
import Board from "./serial_com";

export const loadExperiment = () => async (dispatch, getState) => {
    try{
        dispatch(loadExperimentInProgress());
        const board = new Board();
        let ports = await board.getAvailablePorts();
        if(ports.length > 0){
            board.port = ports[0];
            await board.port.open({ baudRate: 9600 });
            board.textDecoder = new TextDecoderStream();
            board.textEncoder = new TextEncoderStream();
            board.readableStreamClosed = board.port.readable.pipeTo(board.textDecoder.writable);   
            board.writableStreamClosed = board.textEncoder.readable.pipeTo(board.port.writable);
        }
        dispatch(loadBoardSuccess(board));
        let currentState = getState();
        console.log( currentState.experiment.board );
        const response = '[{"desc": \"simula uma coisa\", "name":\"Poste de luz\", "vars":[{"name": \"LED\", "value": false, "type": \"checkbox\"}], "sensors": [{"name": "Fotovoltáico", "value": 2342}] }]'; 
        const experiment = await JSON.parse(response); 
        dispatch(loadExperimentSuccess(experiment));
        
    }catch (e){
       // dispatch(loadTodosFailure);
        dispatch(displayAlert(e))
    }
}

export const updateVars = variable => async dispatch => {
    try{
        const body = JSON.stringify(variable);
        console.log(body);
        const response = '[{"desc": \"simula uma coisa\", "name":\"Poste de luz\", "vars":[{"name": \"LED\", "value": true, "type": "checkbox"}], "sensors": [{"name": "Fotovoltáico", "value": 2342}] }]';
        const experiment = await JSON.parse(response); 
        dispatch(loadExperimentSuccess(experiment));
        console.log(experiment);
    }catch(e){
        dispatch(displayAlert(e));
    }
}

export const requestPort = () => async (dispatch, getState) => {
    try{
        let currentBoard = getState().experiment.board;
        if(!currentBoard.port){
            await currentBoard.requestPort();
            if(currentBoard.port){
                if (!currentBoard.port.readable){
                    await currentBoard.port.open({ baudRate: 9600 });
                    console.log("conexao com a porta aberta");
                }
            }
        }
         
    }catch(e){
        console.log('Nenhuma porta foi selecionada');
    }
}


export const displayAlert = text => () => {
    alert(`Error: '${text}'`);
}