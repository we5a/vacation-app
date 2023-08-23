const BASE_API_URL = "http://localhost:8010/proxy/vacationManagement";

export const getUsers = async () => {
  const response = await fetch(`${BASE_API_URL}/users`);
  const result = await response.json();
  return result._embedded.users;
};
