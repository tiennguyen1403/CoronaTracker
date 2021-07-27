import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalInfo: {},
    countries: [],
    detailCountry: {},
    historyInfo: {}, 
    isLoading: true,
}

const globalSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        setTotalInfo(state,action){
            state.totalInfo = action.payload;
        },
        setCountries(state,action){
            state.countries = action.payload;
        },
        setDetailCountry(state,action){
            state.detailCountry = action.payload;
        },
        setHistoryInfo(state,action){
            state.historyInfo = action.payload;
        },
        setIsLoading(state,action){
            state.isLoading = action.payload;
        },
        resetStore(){
            return initialState;
        }
    }
})

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };