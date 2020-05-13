import { Response } from 'express';
import { getRepository } from 'typeorm';
import { Trip } from '../../entities/trip.entity';
import { List } from '../../entities/list.entity';
import { GetUserAuthInfoRequest } from '../../types';

class TripController {
  static rootPath = '/trip';

  private tripRepository = getRepository(Trip);
  private listRepository = getRepository(List);

  getAllTrips = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const trips = await this.tripRepository.find({
        where: {
          user: request.user,
        },
      });

      return response.json(trips);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  getOneTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const trip = await this.tripRepository.findOne(request.params.tripId);
      if (!trip) {
        return response.json({ error: `No trip with id ${request.params.tripId}` });
      }
      return response.json(trip);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  createTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const userId = request.user;

      const newList = await this.listRepository.create({ user: userId, title: `List for ${request.body.title}` });

      const trip: any = await this.tripRepository.create({ user: userId, ...request.body });

      trip.list = newList;

      const results = await this.tripRepository.save(trip);
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  updateTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const trip = await this.tripRepository.findOne(request.params.tripId);
      if (!trip) {
        return response.json({ error: `No trip with id ${request.params.tripId}` });
      }
      this.tripRepository.merge(trip, request.body);
      const results = await this.tripRepository.save(trip);
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }
  };

  deleteTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    try {
      const results = await this.tripRepository.delete(request.params.tripId);
      return response.json(results);
    } catch (e) {
      return response.json({ error: e.message });
    }

  };
}

export default TripController;
