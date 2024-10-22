// getFilteredItems is a selector in Redux, used to filter the items in the to-do list based on the user's search input
export const getFilteredItems = (state) => {
    const searchInput = state.searchInput.toLowerCase();
    return state.items.filter(
        (item) =>
            item.text.toLowerCase().includes(searchInput) ||
            (item.done && searchInput === 'done') ||
            (!item.done && searchInput === 'undone')
    );
};
