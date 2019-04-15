import { todoReducer } from './todo/reducers'
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    todo: todoReducer
})

export type AppState = ReturnType<typeof rootReducer>