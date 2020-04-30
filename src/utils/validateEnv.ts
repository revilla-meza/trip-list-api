import { cleanEnv, str, port } from 'envalid';
 
function validateEnv() {
  cleanEnv(process.env, {
    POSTGRES_PORT: port(),
    POSTGRES_HOST: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    PORT: port()
  });
}

export default validateEnv;
