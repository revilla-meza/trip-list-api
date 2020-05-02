import ItemController from './ItemController';

const controller = ItemController;

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    getHandler: (controller:any) => controller.getAllItems,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/:itemId',
    method: 'get',
    getHandler: (controller:any) => controller.getOneItem,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath,
    method: 'post',
    getHandler: (controller:any) => controller.createItem,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/:itemId',
    method: 'patch',
    getHandler: (controller:any) => controller.updateItem,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/:itemId' + '/list/:listId/add',
    method: 'patch',
    getHandler: (controller:any) => controller.addItemToList,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/:itemId' + '/list/:listId/remove',
    method: 'patch',
    getHandler: (controller:any) => controller.removeItemFromList,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/:itemId' + '/category/:categoryId/remove',
    method: 'patch',
    getHandler: (controller:any) => controller.removeItemFromCategory,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/:itemId' + '/category/:categoryId/add',
    method: 'patch',
    getHandler: (controller:any) => controller.addItemToCategory,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/:itemId',
    method: 'delete',
    getHandler: (controller:any) => controller.deleteItem,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/list/:listId',
    method: 'get',
    getHandler: (controller:any) => controller.getItemsForList,
    controller,
    root: "item"
  },
  {
    path: controller.rootPath + '/category/:categoryId',
    method: 'get',
    getHandler: (controller:any) => controller.getItemsForCategory,
    controller,
    root: "item"
  },
];

export default Routes;
