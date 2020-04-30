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
    const trips = await this.tripRepository.find({
      where: {
        user: request.user,
      },
    });

    response.json(trips);
  };

  getOneTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    const trip = await this.tripRepository.findOne(request.params.tripId);
    response.json(trip);
  };

  createTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    const userId = request.user;

    const newList = await this.listRepository.create({ user: userId, title: `List for ${request.body.trip.title}` });

    const trip = await this.tripRepository.create(request.body.trip);
    
    trip[0].list = newList;

    const results = await this.tripRepository.save(trip);
    response.json(results);
  };

  updateTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    const trip = await this.tripRepository.findOne(request.params.tripId);
    this.tripRepository.merge(trip, request.body);
    const results = await this.tripRepository.save(trip);
    response.json(results);
  };

  deleteTrip = async (request: GetUserAuthInfoRequest, response: Response) => {
    const results = await this.tripRepository.delete(request.params.tripId);
    response.json(results);
  };
}

export default TripController;
