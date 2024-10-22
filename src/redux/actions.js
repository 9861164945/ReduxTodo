
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const MARK_DONE = 'MARK_DONE';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const SEARCH_ITEM = 'SEARCH_ITEM';

// Here Payload means The additional data that the action carries, which is needed to make changes in the application state;
//Item is the Parameter variable  for the input;


export const addItem = (item) => (
    { 
        type: ADD_ITEM, 
        payload: item 
    }
);
export const deleteItem = (id) => (
    {
         type: DELETE_ITEM,
          payload: id
    }
        );
export const editItem = (item) => (
{ 
    type: EDIT_ITEM,
     payload: item 

}

);
export const markDone = (id) => (
    { 
        type: MARK_DONE,
         payload: id 
    }
    );
export const loadItems = (items) => (
    { 
        type: LOAD_ITEMS,
         payload: items 
    }
    );
export const searchItem = (input) => (
    { 
        type: SEARCH_ITEM,
         payload: input
    }
    );
