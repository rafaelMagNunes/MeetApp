import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/Services/api';
import history from '~/Services/history';

import {
  findMeetupSuccess,
  findMeetupFailure,
  updateMeetupSuccess,
  updateMeetupFailure,
  storeMeetupSuccess,
  storeMeetupFailure,
} from './actions';

export function* findMeetup({ payload }) {
  try {
    const { id } = payload.data[0];

    const response = yield call(api.get, `meetupsbyid/${id}`);
    yield put(findMeetupSuccess(response.data));
    history.push(`/meetup/${id}`);
  } catch (err) {
    toast.error('Erro ao salvar o meetup');

    yield put(findMeetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { id, ...rest } = payload.data;

    const meetup = Object.assign({ id }, rest);

    const response = yield call(api.put, `meetups/${id}`, meetup);

    toast.success('Meetup atualizada com sucesso');

    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar meetup, confira os dados');

    yield put(storeMeetupFailure());
  }
}

export function* storeMeetup({ payload }) {
  try {
    const meetup = payload.data;

    console.log(meetup);

    const response = yield call(api.post, `meetups`, meetup);

    toast.success('Meetup cadastrada com sucesso');

    yield put(storeMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao cadastrar a meetup, confira os dados');

    yield put(updateMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/FIND_MEETUP_REQUEST', findMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@meetup/STORE_MEETUP_REQUEST', storeMeetup),
]);
