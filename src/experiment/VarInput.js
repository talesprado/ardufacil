import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { updateVars } from './thunks';
import { getExperiment } from './selectors';
import { Switch, Range } from 'react-materialize';
import  M  from 'materialize-css';

const VarInput = ( {variable, onValueChanged} ) => {
    const [inputValue, setInputValue] = useState(variable.value);

    useEffect(() => {
        const timeOutId = setTimeout(() => onValueChanged(variable, inputValue), 500);
        return () => clearTimeout(timeOutId);
      }, [inputValue]);
    let inputContent;
    switch(variable.type){
        case ('int'):{
            inputContent = <>
                            <label htmlFor={variable.name}>{variable.label}</label>
                            <input type='number'
                                   id={variable.name}
                                   name={variable.name} 
                                   value={inputValue}
                                   onChange={(e) => {setInputValue(e.target.value); }}
                                    />
                            
                            </>;
            break;
        }
        case ('boolean'):{
            inputContent = <><label htmlFor={variable.name}>{variable.label}</label><Switch onLabel='L' offLabel='D'  checked={inputValue} onChange={(e) => { setInputValue( !(variable.value));}} /></>
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
    experiment: getExperiment ( state )
});
const mapDispatchToProps = dispatch => ({
    onValueChanged: (variable, newValue) => dispatch(updateVars(variable, newValue)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VarInput);