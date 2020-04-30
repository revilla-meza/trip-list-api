import UserController from './UserController';

const controller = UserController;

const Routes = [
  {
    path: controller.rootPath + '/:userId',
    method: 'get',
    getHandler: (controller:any) => controller.getOneUser,
    controller,
    root: "user",

  },
  {
    path: controller.rootPath,
    method: 'post',
    getHandler: (controller:any) => controller.createUser,
    controller,
    root: "user",

  },
  {
    path: controller.rootPath + '/:userId',
    method: 'patch',
    getHandler: (controller:any) => controller.updateUser,
    controller,
    root: "user",
  },
  {
    path: controller.rootPath + '/:userId',
    method: 'delete',
    getHandler: (controller:any) => controller.deleteUser,
    controller,
    root: "user",
  },
];

export default Routes;
