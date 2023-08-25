export const BASE_API_URL =
  "http://ec2-34-242-160-104.eu-west-1.compute.amazonaws.com/vacationManagement";

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

export const deleteUserById = async (userId) => {
  const response = await fetch(`${BASE_API_URL}/users/${userId}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export const getVacationRequests = async () => {
  const response = await fetch(`${BASE_API_URL}/vacationRequests`);
  const result = await response.json();
  return result._embedded.vacationRequests;
};

export const getVacationRequestById = async (id) => {
  const response = await fetch(`${BASE_API_URL}/vacationRequests/${id}`);
  const result = await response.json();
  return result._embedded.vacationRequests;
};

export const getVacationRequestByUserId = async (userId) => {
  const response = await fetch(
    `${BASE_API_URL}/vacationRequests/search/byUser?id=${userId}`,
  );
  const result = await response.json();
  return result._embedded.vacationRequests;
};

export const updateVacationRequestById = async (id, data) => {
  const response = await fetch(`${BASE_API_URL}/vacationRequests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const createVacationRequest = async (body) => {
  const response = await fetch(`${BASE_API_URL}/vacationRequests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
};

export const deleteVacationById = async (id) => {
  const response = await fetch(`${BASE_API_URL}/vacationRequests/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getDataByUrl = async (url) => {
  if (!url) {
    return [];
  }
  const response = await fetch(url);
  const result = await response.json();
  console.info("getDataByUrl result", result, url);
  return result;
};
