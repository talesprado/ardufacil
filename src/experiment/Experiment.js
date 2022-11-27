import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getExperiment, getExperimentLoading, getVars, getBoard, getIsBoardConnected } from './selectors';
import  VarInput  from './VarInput';
import { loadPort, requestPort, requestExperiment, disconnectPort, requestSave } from './thunks';
import { Button, Icon, TextInput } from 'react-materialize';
import Instructions from './Instructions';
import './Experiment.css';


const Experiment = ({ experiment = [], 
                        isLoading, 
                        isBoardConnected = false, 
                        startLoadingExperiment, 
                        onClickRequestPort, 
                        onClickDisconnect, 
                        onClickRequestExperiment, 
                        onClickSave }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            if(isBoardConnected){
             onClickRequestExperiment();
          }}, 300);
          
          return () => clearInterval(interval);
    }, [isBoardConnected]);
    useEffect(() => {
        onClickDisconnect();
      /*  startLoadingExperiment();
        
             interval = setInterval(() => {
                if(isBoardConnected){
                 onClickRequestExperiment();
              }}, 300);
              
              return () => clearInterval(interval);   */
    }, [])

    let connectionContent = <Instructions />;
    if (!isBoardConnected){
        connectionContent = 
            <p><Button onClick={() => { onClickRequestPort()} }>
                <Icon>usb</Icon>
                Conectar Arduino
            </Button></p> ;
    }
  let contentExp = <></>;
  if (isBoardConnected){
      
      contentExp = <><div className='row'>
                      <div className='col s12 m12 z-depth-1'>
                          <p><span> Experiência: </span>{experiment.name}</p>
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
                              <h5>Variáveis</h5>
                              {experiment.variables.map( variable => <VarInput key={variable.name} variable={variable} /> )}
                              <br />
                          </div>
                      </div>
                  </div></>;
  }
  
    const content = (
        <div className='container'>
            {isLoading ? <Icon tiny className='orange-text text-lighten-3'>update</Icon>: <Icon tiny className='white-text text-lighten-7'>update</Icon> }
            <div className='row'>
                <div className='col s12 m12 z-depth-1'>
                    <h5>Conexão</h5>
                    {connectionContent}
                </div>
            </div>
            {contentExp}
           <Button waves='light' id="btnSave" onClick={() => onClickSave()}>Salvar</Button>
        </div>
    );
    

    return content;
};

const mapStateToProps = state => ({
    isLoading: getExperimentLoading( state ),
    isBoardConnected: getIsBoardConnected( state ),
    experiment: getExperiment ( state ),
    board: getBoard( state ),
    vars: getVars( state )
});

const mapDispatchToProps = dispatch => ({
    startLoadingExperiment  : () =>   dispatch( loadPort() ),
    onClickRequestPort : () => dispatch( requestPort() ),
    onClickRequestExperiment : () => dispatch( requestExperiment() ),
    onClickDisconnect: () => dispatch ( disconnectPort() ),
    onClickSave: () => dispatch( requestSave() )
});
export default connect(mapStateToProps, mapDispatchToProps)(Experiment);