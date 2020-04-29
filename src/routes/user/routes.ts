import UserController from './UserController';

const controller = new UserController();

const Routes = [
  {
    path: controller.rootPath + '/:userId',
    method: 'get',
    handler: controller.getOneUser,
  },
  {
    path: controller.rootPath,
    method: 'post',
    handler: controller.createUser,
  },
  {
    path: controller.rootPath + '/:userId',
    method: 'patch',
    handler: controller.updateUser,
  },
  {
    path: controller.rootPath + '/:userId',
    method: 'delete',
    handler: controller.deleteUser,
  },
];

export default Routes;
