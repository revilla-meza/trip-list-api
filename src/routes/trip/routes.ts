import TripController from './TripController';

const controller = TripController;

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    getHandler: (controller:any) => controller.getAllTrips,
    controller,
    root: "trip",
  },
  {
    path: controller.rootPath + '/:tripId',
    method: 'get',
    getHandler: (controller:any) => controller.getOneTrip,
    controller,
    root: "trip",
  },
  {
    path: controller.rootPath,
    method: 'post',
    getHandler: (controller:any) => controller.createTrip,
    controller,
    root: "trip",
  },
  {
    path: controller.rootPath + '/:tripId',
    method: 'patch',
    getHandler: (controller:any) => controller.updateTrip,
    controller,
    root: "trip",
  },
  {
    path: controller.rootPath + '/:tripId',
    method: 'delete',
    getHandler: (controller:any) => controller.deleteTrip,
    controller,
    root: "trip",
  },
];

export default Routes;
