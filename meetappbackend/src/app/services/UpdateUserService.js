import User from '../models/User';

class UpdateUserService {
  async run({ body, user_id, email, old_password }) {
    const user = await User.findByPk(user_id);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        throw new Error('User already exists');
      }
    }

    if (old_password && !(await user.checkPassword(old_password))) {
      throw new Error('Password does not match');
    }

    const updated_user = await user.update(body);

    return updated_user;
  }
}

export default new UpdateUserService();
