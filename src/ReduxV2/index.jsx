import { createContext, useContext, useReducer } from "react";
import initialState from "./Store";
const AppContext = createContext();

const reducer = (state, action) => {
    let newState = { ...state };
    action.forEach(arr => {
        const [name, value] = arr;
        newState = {
            ...newState,
            [name]: value
        };
    });
    if (newState.store) {
        return newState.store;
    } else return newState;
};

const AppProvider = ({ children }) => {
    const [state, multiDispatch] = useReducer(reducer, initialState);

    const dispatch = (name, value) => {
        return multiDispatch([[name, value]]);
    };
    return (
        <AppContext.Provider
            value={{ ...state, store: state, dispatch, multiDispatch }}
        >
            {children}
        </AppContext.Provider>
    );
};
//global context hook
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, AppContext, useGlobalContext };
