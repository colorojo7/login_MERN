import { toast } from "sonner";

export const fetchPOST = async (endpoint, bodyObj) => {
  try {
    const response = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyObj),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("UPS. Somthing went wrong. Try again");
  }
};

export const fetchGET = async (endpoint) => {
  try {
    const response = await fetch(`${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      if (response.status === 401) {
        //  401 handling
        return { ok: false, status: 401, message: "Unauthorized" };
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("UPS. Somthing went wrong. Try again");
  }
};
