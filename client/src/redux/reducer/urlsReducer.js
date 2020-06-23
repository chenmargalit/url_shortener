const urlsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_URLS_FROM_DB':
      console.log('fetching urls in reducer');

      return {
        ...state,
        urls: action.payload,
      };
  }
};

export default urlsReducer;
