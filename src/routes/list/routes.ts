import ListController from './ListController';

const controller = ListController;

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    getHandler: (controller:any) => controller.getAllLists,
    controller,
    root: "list",
  },
  {
    path: controller.rootPath + '/:listId',
    method: 'get',
    getHandler: (controller:any) => controller.getOneList,
    controller,
    root: "list",
  },
  {
    path: controller.rootPath,
    method: 'post',
    getHandler: (controller:any) => controller.createList,
    controller,
    root: "list",
  },
  {
    path: controller.rootPath + '/:listId',
    method: 'patch',
    getHandler: (controller:any) => controller.updateList,
    controller,
    root: "list",
  },
  {
    path: controller.rootPath + '/:listId',
    method: 'delete',
    getHandler: (controller:any) => controller.deleteList,
    controller,
    root: "list",
  },
];

export default Routes;
