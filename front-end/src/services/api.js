const BASE_API_URL =
  "http://ec2-34-242-160-104.eu-west-1.compute.amazonaws.com/vacationManagement";

export const getUsers = async () => {
  const response = await fetch(`${BASE_API_URL}/users`);
  const result = await response.json();
  return result._embedded.users;
};

export const getUserById = async (userId) => {
  const response = await fetch(`${BASE_API_URL}/users/${userId}`);
  const result = await response.json();
  return result;
};

export const getVacationRequests = async () => {
  const response = await fetch(`${BASE_API_URL}/vacationRequests`);
  const result = await response.json();
  return result._embedded.vacationRequests;
};
