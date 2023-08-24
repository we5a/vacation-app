export const BASE_API_URL2 =
  "http://ec2-34-242-160-104.eu-west-1.compute.amazonaws.com/vacationManagement";
// for local needs
export const BASE_API_URL = "http://localhost:8010/proxy/vacationManagement";

export const getUsers = async () => {
  const response = await fetch(`${BASE_API_URL}/users`);
  const result = await response.json();
  return result._embedded.users;
};

export const createUser = async (userData) => {
  const response = await fetch(`${BASE_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const result = await response.json();
  return result;
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