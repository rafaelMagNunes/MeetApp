import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import CreateSubscriptionService from '../services/CreateSubscriptionService';
import Cache from '../../lib/Cache';

class SubscriptionController {
  async index(req, res) {
    const cacheKey = `user:${req.userId}:subscriptions`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    await Cache.set(cacheKey, subscriptions);

    return res.json(subscriptions);
  }

  async store(req, res) {
    const subscription = await CreateSubscriptionService.run({
      user_id: req.userId,
      meetup_id: req.params.id,
    });

    await Cache.invalidate('subscriptions');

    return res.json(subscription);
  }
}

export default new SubscriptionController();
