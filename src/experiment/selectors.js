import { createSelector } from "reselect";

export const getExperiment        = state => state.experiment.data;
export const getExperimentLoading = state => state.experiment.isLoading;
export const getDescription       = state => state.experiment.data.desc;
export const getVars              = state => state.experiment.data.variables;
export const getBoard             = state => state.experiment.board;
export const getIsBoardConnected = state  => state.experiment.isBoardConnected;


