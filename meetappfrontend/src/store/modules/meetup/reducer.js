import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function findMeetupById(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/FIND_MEETUP_REQUEST': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/FIND_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/FIND_MEETUP_FAILURE': {
        draft.meetup = null;
        break;
      }
      case '@meetup/UPDATE_MEETUP_REQUEST': {
        draft.meetup = action.payload.data;
        break;
      }
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/UPDATE_MEETUP_FAILURE': {
        draft.meetup = null;
        break;
      }
      case '@meetup/STORE_MEETUP_REQUEST': {
        draft.meetup = action.payload.data;
        break;
      }
      case '@meetup/STORE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/STORE_MEETUP_FAILURE': {
        draft.meetup = null;
        break;
      }
      default:
    }
  });
}
