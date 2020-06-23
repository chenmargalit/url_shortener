import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

export function* fetch_all_urls() {
  yield takeEvery('FETCH_ALL_URLS', fetch_all_urls_from_db);
}

function* fetch_all_urls_from_db() {
  const urls = yield axios.get('http://localhost:5000/fetch/getAll');
  yield put({ type: 'FETCH_ALL_URLS_FROM_DB', payload: urls.data });
}

export function* delete_all_urls() {
  yield takeEvery('DELETE_ALL_URLS', delete_all_urls_from_db);
}

function* delete_all_urls_from_db() {
  yield axios.delete('http://localhost:5000/delete/deleteAll');
  yield put({ type: 'DELETE_ALL_URLS_FROM_DB' });
}

export function* create_url() {
  yield takeEvery('CREATE_URL', create_new_url);
}

function* create_new_url(payload) {
  const originalUrl = payload.values.url;
  const urls = yield axios.post('http://localhost:5000/create/createUrl', { originalUrl });

  // if url exists, put it in redux
  if (urls.data.substring(0, 3) === 'Url') {
    const existingUrl = urls.data.substring(13, urls.data.length);
    yield put({ type: 'GET_EXISTING_REDIRECT_URL', payload: existingUrl });

    // otherwise, create it
  } else {
    yield put({ type: 'CREATE_NEW_URL', payload: urls.data });
    yield fetch_all_urls_from_db();
  }
}
