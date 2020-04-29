import TripController from './TripController';

const controller = new TripController();

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    handler: controller.getAllTrips,
  },
  {
    path: controller.rootPath + '/:tripId',
    method: 'get',
    handler: controller.getOneTrip,
  },
  {
    path: controller.rootPath,
    method: 'post',
    handler: controller.createTrip,
  },
  {
    path: controller.rootPath + '/:tripId',
    method: 'patch',
    handler: controller.updateTrip,
  },
  {
    path: controller.rootPath + '/:tripId',
    method: 'delete',
    handler: controller.deleteTrip,
  },
];

export default Routes;
