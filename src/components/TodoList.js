// TodoList.js
import React, { useState, useEffect } from 'react';//Importing Usestate and use effect for local storage and state function.
import { useDispatch, useSelector } from 'react-redux';
/*
*useDispath:A Hook that gives you access to the dispatch function, allowing you to send actions to the Redux store.
*useSelector:A Hook that allows you to extract data from the Redux store state.
*/import {
    addItem,
    editItem,
    deleteItem,
    markDone,
    searchItem,
    loadItems
} from '../redux/actions';
import { getFilteredItems } from '../redux/selector';// import  this getFiltered items function returnthat filters the todo items based on the search input.

import './TodoList.css';

const TodoList = () => {
    const dispatch = useDispatch();
    //Use that getFiltered Function using UseSelector.
   
    const items = useSelector(getFilteredItems);
//A State to hold the value of the new item input.
    const [newItem, setNewItem] = useState('');
// A State to hold the ID of the item being edited
    const [editId, setEditId] = useState(null);
//A State to hold the text of the item being edited.   
    const [editText, setEditText] = useState('');
//effect runs once when the component mounts  and save items in local storage.
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('todoItems'));
        if (savedItems) {
            dispatch(loadItems(savedItems));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('todoItems', JSON.stringify(items));
    }, [items]);

    //Event Handlers
    //new Item,AddItem Event Handler
    const handleAddItem = () => {
        if (newItem.trim()) {
            dispatch(addItem({ id: Date.now(), text: newItem }));
            setNewItem('');
        }
    };

    //Edit Existing Items event Handler
    const handleEditItem = (item) => {
        setEditId(item.id);
        setEditText(item.text);
    };
    

    const handleSaveEdit = () => {
        if (editText.trim()) {
            dispatch(editItem({ id: editId, text: editText }));
            setEditId(null);
            setEditText('');
        }
    };
//Search Feature event Handler
    const handleSearch = (e) => {
        dispatch(searchItem(e.target.value));
    };
    //Change Item Position event Handler

    const moveItemUp = (id) => {
        const index = items.findIndex((item) => item.id === id);
        if (index > 0) {
            const updatedItems = [...items];
            [updatedItems[index], updatedItems[index - 1]] = [updatedItems[index - 1], updatedItems[index]];
            dispatch(loadItems(updatedItems));
        }
    };

    const moveItemDown = (id) => {
        const index = items.findIndex((item) => item.id === id);
        if (index < items.length - 1) {
            const updatedItems = [...items];
            [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
            dispatch(loadItems(updatedItems));
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddItem}>Add</button>

            <input
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
            />

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
                            {editId === item.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button onClick={handleSaveEdit}>Save</button>
                                </>
                            ) : (
                                item.text
                            )}
                        </span>
                        <button onClick={() => dispatch(markDone(item.id))}>
                            {item.done ? 'Undo' : 'Done'}
                        </button>
                        <button onClick={() => handleEditItem(item)}>Edit</button>
                        <button onClick={() => dispatch(deleteItem(item.id))}>Delete</button>
                        <button onClick={() => moveItemUp(item.id)}>↑</button>
                        <button onClick={() => moveItemDown(item.id)}>↓</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
