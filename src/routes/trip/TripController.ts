import { Response } from "express";
import { getRepository } from 'typeorm';
import { Trip } from '../../entities/trip.entity';
import { IGetUserAuthInfoRequest } from "../../types";

class TripController {
  public rootPath = '/trip';

  private tripRepository = getRepository(Trip);
 
  getAllTrips = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const trips = 
      await this.tripRepository.find({
        where: { 
          userId: request.user[process.env.AUTH0_AUDIENCE + '/userId'],
        }
      });

    response.json(trips);
  }

  getOneTrip = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const trip = await this.tripRepository.findOne(request.params.tripId);
    response.json(trip);
  }

  createTrip = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const trip = await this.tripRepository.create(request.body);
    const results = await this.tripRepository.save(trip);
    response.json(results);
  }

  updateTrip = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const trip = await this.tripRepository.findOne(request.params.tripId);
    this.tripRepository.merge(trip, request.body);
    const results = await this.tripRepository.save(trip);
    response.json(results);
  }

  deleteTrip = async (request: IGetUserAuthInfoRequest, response: Response) => {
    const results = await this.tripRepository.delete(request.params.tripId);
    response.json(results);
  }
}

export default TripController;
