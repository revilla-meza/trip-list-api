import CategoryController from './CategoryController';

const controller = CategoryController;

const Routes = [
  {
    path: controller.rootPath,
    method: 'get',
    getHandler: (controller:any) => controller.getAllCategories,
    controller,
    root: "category",
  },
  {
    path: controller.rootPath + '/:categoryId',
    method: 'get',
    getHandler: (controller:any) => controller.getOneCategory,
    controller,
    root: "category",
  },
  {
    path: controller.rootPath,
    method: 'post',
    getHandler: (controller:any) => controller.createCategory,
    controller,
    root: "category",
  },
  {
    path: controller.rootPath + '/:categoryId',
    method: 'patch',
    getHandler: (controller:any) => controller.updateCategory,
    controller,
    root: "category",
  },
  {
    path: controller.rootPath + '/:categoryId',
    method: 'delete',
    getHandler: (controller:any) => controller.deleteCategory,
    controller,
    root: "category",
  },
];

export default Routes;
