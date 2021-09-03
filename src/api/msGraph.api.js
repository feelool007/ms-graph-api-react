import { client } from "../msal-services";

export const getMe = async () => {
  try {
    const response = await client.api("/me").get();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    const response = await client.api(`/me/events/${id}`).get();
    return response;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (payload) => {
  try {
    const response = await client.api("/me/events").post(payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (id, payload) => {
  try {
    const response = await client.api("/me/events/" + id).patch(payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const cancelEvent = async (id, payload = {}) => {
  try {
    await client.api(`/me/events/${id}/cancel`).post(payload);
  } catch (error) {
    throw error;
  }
};

// export const cancelEvent = async (id) => {
//   try {
//     await client.api(`/me/events/${id}`).delete();
//   } catch (error) {
//     throw error;
//   }
// };
