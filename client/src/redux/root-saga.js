import { all, call } from 'redux-saga/effects';

import { fetch_all_urls, delete_all_urls, create_url } from './sagas/urls.sagas';

export default function* rootSaga() {
  // all allows us to run all the funcs concurrently
  yield all([call(fetch_all_urls), call(delete_all_urls), call(create_url)]);
}
