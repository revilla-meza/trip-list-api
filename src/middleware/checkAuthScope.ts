const jwtAuthz = require('express-jwt-authz');

const checkAuthScope = (...permisions:string[]) => {
   return jwtAuthz(permisions);
}

export default checkAuthScope;