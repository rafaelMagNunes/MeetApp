import User from '../models/User';
import UpdateUserService from '../services/UpdateUserService';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, old_password } = req.body;

    const user = await UpdateUserService.run({
      body: req.body,
      user_id: req.userId,
      email,
      old_password,
    });

    return res.json(user);
  }
}

export default new UserController();
