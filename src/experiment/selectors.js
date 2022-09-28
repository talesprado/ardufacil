import { createSelector } from "reselect";

export const getExperiment        = state => state.experiment.data[0];
export const getExperimentLoading = state => state.experiment.isLoading;
export const getDescription       = state => state.experiment.data.desc;
export const getVars              = state => state.experiment.data.vars;
export const getBoard             = state => state.experiment.board;

export const getAllExperiments = createSelector (
    getExperiment,
);
