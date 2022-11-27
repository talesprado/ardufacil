import React from 'react';
import { hot } from 'react-hot-loader';
import Experiment from './experiment/Experiment';
import './App.css';

const App = () => (
    
    <div className="App">
        <Experiment />
    </div>
)

export default hot(module)(App);