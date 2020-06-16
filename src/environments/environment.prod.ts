interface AppEnv {
  production: boolean;
  base_uri: string;
}

export const environment = {
  production: false,
  base_uri: 'https://markerboy-api.herokuapp.com/',
};