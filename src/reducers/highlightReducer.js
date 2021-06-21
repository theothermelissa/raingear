const highlightReducer = (state, action) => {
    switch (action.type) {
        case 'setHighlighted': 
            return {
                ...state,
                highlightedIDs: action.payload,
            }
        case 'removeHighlighted':
            return {
                ...state,
                highlightedIDs: null,
            }
        default: throw new Error('unknown action');
    } 
};

export default highlightReducer;