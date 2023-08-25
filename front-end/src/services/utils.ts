const APP_USER_KEY = "vaca_user";

const saveToLocalStorage = (key: string) => {
  return function (data: object) {
    const serializedData = btoa(JSON.stringify(data));
    localStorage.setItem(key, serializedData);
  };
};

const getFromLocalStorage = (key: string) => {
  return function () {
    const retrievedData: string | null = localStorage.getItem(key);
    if (retrievedData) {
      return  JSON.parse(atob(retrievedData));
    }
  };
};

const deleteFromLocalStorage = (key: string) => {
  return function() {
    localStorage.removeItem(key);
  }
}

export const saveUserPermanently = saveToLocalStorage(APP_USER_KEY);
export const getLocalUser = getFromLocalStorage(APP_USER_KEY);
export const deleteLocalUser = deleteFromLocalStorage(APP_USER_KEY);
