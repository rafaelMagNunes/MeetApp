export function findMeetupRequest(data) {
  return {
    type: '@meetup/FIND_MEETUP_REQUEST',
    payload: { data },
  };
}

export function findMeetupSuccess(meetup) {
  return {
    type: '@meetup/FIND_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function findMeetupFailure() {
  return {
    type: '@meetup/FIND_MEETUP_FAILURE',
  };
}

export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function updateMeetupFailure() {
  return {
    type: '@meetup/UPDATE_MEETUP_FAILURE',
  };
}

export function storeMeetupRequest(data) {
  return {
    type: '@meetup/STORE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function storeMeetupSuccess(meetup) {
  return {
    type: '@meetup/STORE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function storeMeetupFailure() {
  return {
    type: '@meetup/STORE_MEETUP_FAILURE',
  };
}
