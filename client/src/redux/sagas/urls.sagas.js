import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Matches Dashboard
export function* fetch_all_urls() {
  console.log('fetching urls - first func');
  yield takeEvery('FETCH_ALL_URLS', fetch_all_urls_from_db);
}

// Matches Reducer
function* fetch_all_urls_from_db() {
  console.log('fetching urls, calling reducer');
  const urls = yield axios.get('http://localhost:5000/fetch/getAll');
  console.log('urls are in sagas', urls);
  yield put({ type: 'FETCH_ALL_URLS_FROM_DB', payload: urls.data });
}
