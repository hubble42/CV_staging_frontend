import { createStore } from 'redux';

const initialState = {
  selectedObjects: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_OBJECTS':
      return {
        ...state,
        selectedObjects: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store; // Add this line to export the store
