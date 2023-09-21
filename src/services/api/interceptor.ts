import api from "./api";

export const setInterceptorToken = (token?: string) => {
  if (token) {
    api.addRequestTransform((request) => {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      };

      return request;
    });
  }
};
