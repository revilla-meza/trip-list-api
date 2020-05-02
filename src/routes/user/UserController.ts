import { Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { GetUserAuthInfoRequest } from '../../types';

class UserController {
  static rootPath = '/user';

  private userRepository = getRepository(User);

  getOneUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    const user = await this.userRepository.findOne(request.params.userId);
    response.json({ user: user || null });
  };

  createUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    // interface body { email:string }
    let results;
    try {
      const user = await this.userRepository.create(request.body);

      results = await this.userRepository.save(user);
    } catch (e) {
      response.json({ error: e.message });
    }

    response.json(results);
  };

  updateUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    const user = await this.userRepository.findOne(request.params.userId);
    if (!user) {
      return response.json({ error: `No user with id ${request.params.userId}` })
    }
    this.userRepository.merge(user, request.body);
    const results = await this.userRepository.save(user);
    response.json(results);
  };

  deleteUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    const results = await this.userRepository.delete(request.params.userId);
    response.json(results);
  };
}

export default UserController;
