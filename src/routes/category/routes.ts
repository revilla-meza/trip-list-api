import CategoryController from './CategoryController';

const controller = new CategoryController();

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    handler: controller.getAllCategories,
  },
  {
    path: controller.rootPath + '/:categoryId',
    method: 'get',
    handler: controller.getOneCategory,
  },
  {
    path: controller.rootPath,
    method: 'post',
    handler: controller.createCategory,
  },
  {
    path: controller.rootPath + '/:categoryId',
    method: 'patch',
    handler: controller.updateCategory,
  },
  {
    path: controller.rootPath + '/:categoryId',
    method: 'delete',
    handler: controller.deleteCategory,
  },
];

export default Routes;
