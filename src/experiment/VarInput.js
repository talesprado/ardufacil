import React, {useState} from 'react';
import { connect } from 'react-redux';
import { updateVars } from './thunks';
import { getExperiment } from './selectors';
import { Switch} from 'react-materialize';

const VarInput = ( {variable, onValueChanged} ) => {
    const [inputValue, setInputValue] = useState(variable.value);
    let inputContent;
    switch(variable.type){
        case ('numeric'):{
            inputContent = <div className='input-field col s12'>
                            <input type={variable.type} 
                                   id={variable.name}
                                   name={variable.name} 
                                   value={inputValue} 
                                   onChange={(e) => {setInputValue(e.target.value); onValueChanged(variable)}} />
                            <label className='active' htmlFor={variable.name}>{variable.name}</label>
                            </div>;
            break;
        }
        case ('checkbox'):{
            inputContent = <><legend>{variable.name}</legend><Switch offLabel='Desligado' onLabel='Ligado' checked={variable.value} onChange={(e) => {setInputValue(e.target.value); onValueChanged(variable)}} /></>
            break;
        }
        default:
            break;
    }
    return(
        <>
                   
            { inputContent }
        </>
    );
}

const mapStateToProps = state => ({
    experiment: getExperiment ( state ),
});
const mapDispatchToProps = dispatch => ({
    onValueChanged: variable => dispatch(updateVars(variable)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VarInput);