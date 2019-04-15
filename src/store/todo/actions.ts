import { ADD_TODO, TodoActionTypes } from './types'
import ITodo from '../../models/ITodo'

export const addTodo = (todo: ITodo): TodoActionTypes => ({
    type: ADD_TODO,
    todo
})