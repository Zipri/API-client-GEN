export const PORT = 5000;

export const SWAGGER_SRC_DIR = 'swaggerSrc/';
export const FETCH_CLIENTS_DIR = 'openapiFetchClients/';
export const AXIOS_CLIENTS_DIR = 'openapiAxiosClients/';
export const mongoLogin = process.env.MONGODB_LOGIN;
export const mongoPassword = process.env.MONGODB_PASSWORD;
export const environment = {
  development: {
    // serverURL: `http://localhost:${PORT}/`,
    dbString: `mongodb://localhost:27017/Project_rs`
  },
  production: {
      // serverURL: `http://localhost:${PORT}/`,
      dbString: `mongodb+srv://${mongoLogin}:${mongoPassword}@clustertest.zsjvl.mongodb.net/?retryWrites=true&w=majority`
  }
};

export type EnvType = "development" | "production";
export const SECRET_KEY = process.env.TOKEN_SECRET_KEY || 'q_w_e_r_t_y_1^2^3^4^5';