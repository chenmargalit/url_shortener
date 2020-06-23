const urlsReducer = (state = { urls: [], existing_url: '' }, action) => {
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
    case 'GET_EXISTING_REDIRECT_URL':
      return {
        ...state,
        existing_url: action.payload,
      };
    case 'CREATE_NEW_URL':
      return {
        ...state,
        urls: [action.payload],
        existing_url: '',
      };
    default:
      return state;
  }
};

export default urlsReducer;
