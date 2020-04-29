import listRoutes from './list/routes';
import itemRoutes from './item/routes';
import categoryRoutes from './category/routes';
import tripRoutes from './trip/routes';
import userRoutes from './user/routes';

export default [...listRoutes, ...userRoutes, ...tripRoutes, ...categoryRoutes, ...itemRoutes];
