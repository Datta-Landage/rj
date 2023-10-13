// const userId = "64ba6cb61d11ff6c94ddcb4c";
// const userId = "64b6eb7ebf0d6ea18ede1d2d";
const API_HOST = process.env.REACT_APP_API_HOST;

// export const API = {
//   getMessages: (userId: string) => `${API_HOST}/messages/${userId}`,
//   sendMessage: (userId: string) => `${API_HOST}/messages/${userId}`,
//   getUserInfo: (userId: string) => `${API_HOST}/userAccount/${userId}`,
// };

export const API = {
  getMessages: (userId: string) =>
    `https://it-eta.vercel.app/messages/${userId}`,
  sendMessage: (userId: string) =>
    `https://it-eta.vercel.app/messages/${userId}`,
  getUserInfo: (userId: string) =>
    `https://it-eta.vercel.app/userAccount/${userId}`,
};
