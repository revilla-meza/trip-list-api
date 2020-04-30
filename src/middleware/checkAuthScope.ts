import jwtAuthz from 'express-jwt-authz';

const checkAuthScope = (...permisions:string[]) => {
   return jwtAuthz(permisions);
}

export default checkAuthScope;