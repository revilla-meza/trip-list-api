import ItemController from './ItemController';

const controller = new ItemController();

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    handler: controller.getAllItems,
  },
  {
    path: controller.rootPath + '/:itemId',
    method: 'get',
    handler: controller.getOneItem,
  },
  {
    path: controller.rootPath,
    method: 'post',
    handler: controller.createItem,
  },
  {
    path: controller.rootPath + '/:itemId',
    method: 'patch',
    handler: controller.updateItem,
  },
  {
    path: controller.rootPath + '/:itemId',
    method: 'delete',
    handler: controller.deleteItem,
  },
  {
    path: controller.rootPath + '/list/:listId',
    method: 'get',
    handler: controller.getItemsForList,
  },
  {
    path: controller.rootPath + '/category/:categoryId',
    method: 'get',
    handler: controller.getItemsForCategory,
  },
];

export default Routes;
