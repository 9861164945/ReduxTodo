
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, MARK_DONE, LOAD_ITEMS, SEARCH_ITEM } from './actions';

const initialState = {
    items: [],
    searchInput: '',
};
//The Function todoReducer takes the Parameter as State and Action and it returns the default return state Which is one of the parameter Variable
const todoReducer = (state = initialState, action) => 
    {
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] };
        case DELETE_ITEM:
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        case EDIT_ITEM:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, text: action.payload.text } : item
                ),
            };
        case MARK_DONE:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload ? { ...item, done: !item.done } : item
                ),
            };
        case LOAD_ITEMS:
            return { ...state, items: action.payload };
        case SEARCH_ITEM:
            return { ...state, searchInput: action.payload };
        default:
            return state;
    }
};

export default todoReducer;
