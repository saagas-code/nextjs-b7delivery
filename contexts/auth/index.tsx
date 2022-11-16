import { reducer } from './reducer'
import {createContext, useReducer} from 'react'
import {ContextType, ProviderType, DataType} from './types'

export {useAuthContext} from './hook'

const initialState: DataType = {
    token: '',
    user: null,
}

export const AppContext = createContext<ContextType>({
    state: initialState,
    dispatch: () => {}
});

export const Provider = ({children}: ProviderType) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = {state, dispatch}
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}