import ListController from './ListsController';

const controller = new ListController();

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    handler: controller.getAllLists,
  },
  {
    path: controller.rootPath + '/:listId',
    method: 'get',
    handler: controller.getOneList,
  },
  {
    path: controller.rootPath,
    method: 'post',
    handler: controller.createList,
  },
  {
    path: controller.rootPath + '/:listId',
    method: 'patch',
    handler: controller.updateList,
  },
  {
    path: controller.rootPath + '/:listId',
    method: 'delete',
    handler: controller.deleteList,
  },
];

export default Routes;
