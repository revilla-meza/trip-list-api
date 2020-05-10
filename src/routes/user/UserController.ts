import { Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { GetUserAuthInfoRequest } from '../../types';

class UserController {
  static rootPath = '/user';

  private userRepository = getRepository(User);

  getAllUsers = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const users = await this.userRepository.find();
      return response.json(users);
    } catch (e) {
      response.json({ error: e.message });
    }
  };

  getUserByEmail = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const user = await this.userRepository.findOne({ email: request.headers.email});
      if (!user) {
        response.status(404);
        return response.json({ error: `no user with email: ${request.headers.email}` });
      }
      return response.json(user);
    } catch (e) {
      response.json({ error: e.message });
    }
  };

  getOneUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const user = await this.userRepository.findOne(request.params.userId);
      if (!user) {
        response.status(404);
        return response.json({ error: `no user with id: ${request.params.userId}` });
      }
      return response.json(user);
    } catch (e) {
      response.json({ error: e.message });
    }
  };

  createUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const user = await this.userRepository.create(request.body);

      let results = await this.userRepository.save(user);
      return response.json(results);
    } catch (e) {
      response.status(400);
      response.json({ error: e.message });
    }
  };

  updateUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const user = await this.userRepository.findOne(request.params.userId);
      if (!user) {
        return response.json({ error: `No user with id ${request.params.userId}` });
      }
      this.userRepository.merge(user, request.body);
      const results = await this.userRepository.save(user);
      return response.json(results);
    } catch (e) {
      response.json({ error: e.message });
    }
  };

  deleteUser = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const results = await this.userRepository.delete(request.params.userId);
      return response.json(results);
    } catch (e) {
      response.json({ error: e.message });
    }
  };
}

export default UserController;
