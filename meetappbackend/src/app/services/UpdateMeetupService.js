import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class UpdateMeetupService {
  async run({ body, user_id, meetup_id }) {
    const meetup = await Meetup.findByPk(meetup_id);

    if (meetup.user_id !== user_id) {
      throw new Error('Not authorized');
    }

    if (isBefore(parseISO(body.date), new Date())) {
      throw new Error('Meetup date invalid');
    }

    if (meetup.past) {
      throw new Error("Can't update past meetups");
    }

    await meetup.update(body);

    return meetup;
  }
}

export default new UpdateMeetupService();
