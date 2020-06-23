const urlsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_URLS_FROM_DB':
      return {
        ...state,
        urls: action.payload,
      };
    case 'DELETE_ALL_URLS_FROM_DB':
      return {
        urls: [],
      };
    case 'CREATE_NEW_URL':
      return {
        ...state,
        urls: [action.payload],
      };
    default:
      return state;
  }
};

export default urlsReducer;
