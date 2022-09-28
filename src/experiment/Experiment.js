import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getExperiment, getExperimentLoading, getVars, getBoard } from './selectors';
import  VarInput  from './VarInput';
import { loadExperiment, requestPort } from './thunks';
import { Button, Icon, TextInput } from 'react-materialize';


const Experiment = ({ experiment = [], board = [], isLoading, startLoadingExperiment, onClickRequestPort }) => {
    useEffect(() => {
        startLoadingExperiment()
    }, [])

    const loadingMessage = <div>loading...</div>;
    let connectionContent = <p>Já conectado</p>
    if (!board.availablePorts.size){
        connectionContent = <Button onClick={() => { onClickRequestPort()} }>
                                <Icon>usb</Icon>
                                Desconectar Arduino
                            </Button> ;
    }
    const content = (
        <div className='container'>
            <div className='row'>
                <div className='col s12 m12 z-depth-1'>
                    <h5>Conexão</h5>
                    <p>{connectionContent}</p>
                </div>
            </div>

            <div className='row'>
                <div className='col s12 m12 z-depth-1'>
                    <p><span> Experiência: </span>{experiment.name}</p>
                    <p><span> Descrição: </span>{experiment.desc}</p>
                </div>
            </div>
            
            <div className='row'>
                <div className='col s12 m12 z-depth-1'>
                    <div className='col s6 m6'>
                        <h5>Sensores</h5>
                        {experiment.sensors.map( sensor => <div key={sensor.name} className="input-field col s6">          
                                                                    <input id="icon_telephone" type="numeric" disabled={true} value={sensor.value} />
                                                                    <label className="active" htmlFor="icon_telephone">{sensor.name}</label>
                                                            </div> )}
                    </div>
                    <div className='col s6 m6'>
                        <h5>Saídas</h5>
                        {experiment.vars.map( variable => <VarInput key={variable.name} variable={variable} /> )}
                    </div>
                </div>
            </div>
           
           
           <Button waves='light' id="btnSave">Salvar</Button>
        </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getExperimentLoading( state ),
    experiment: getExperiment ( state ),
    board: getBoard( state ),
    vars: getVars( state )
});

const mapDispatchToProps = dispatch => ({
    startLoadingExperiment  : () =>   dispatch( loadExperiment() ),
    onClickRequestPort : () => dispatch( requestPort() )
  //  onRemovePressed    : todoId => dispatch(removeTodoRequest(todoId)),
  //  onCompletedPressed : todoId => dispatch(completeTodoRequest(todoId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Experiment);