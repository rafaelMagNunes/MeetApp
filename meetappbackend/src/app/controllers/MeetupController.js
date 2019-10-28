import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import UpdateMeetupService from '../services/UpdateMeetupService';
import DeleteMeetupService from '../services/DeleteMeetupService';
import Cache from '../../lib/Cache';

class MeetupController {
  async index(req, res) {
    const where = {};
    const { page = 1 } = req.query;

    const cacheKey = `user:${req.userId}:meetups:${page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      include: [User, File],
      limit: 10,
      offset: 10 * page - 10,
    });

    await Cache.set(cacheKey, meetups);

    return res.json(meetups);
  }

  async store(req, res) {
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    await Cache.invalidatePrefix(`user:${user_id}:meetups`);

    return res.json(meetup);
  }

  async update(req, res) {
    const user_id = req.userId;

    const meetup = await UpdateMeetupService.run({
      body: req.body,
      user_id,
      meetup_id: req.params.id,
    });

    return res.json(meetup);
  }

  async delete(req, res) {
    const user_id = req.userId;

    await DeleteMeetupService.run({
      user_id,
      meetup_id: req.params.id,
    });

    return res.send();
  }

  async findById(req, res) {
    const meetups = await Meetup.findOne({
      where: { id: req.params.id, user_id: req.userId },
      include: [File],
    });

    return res.json(meetups);
  }
}

export default new MeetupController();
