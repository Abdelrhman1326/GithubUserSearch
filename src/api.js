import axios from "axios";

const BASE_URL = "https://api.github.com";

const HEADERS = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // use env file for safety
};

export async function searchUsers(query) {
    try {
        const response = await axios.get(`${BASE_URL}/search/users?q=${query}`, {
            headers: HEADERS,
        });

        return { data: response.data, error: null };
    } catch (error) {
        const status = error.response?.status;

        if (status === 429 || error.message?.includes("rate limit")) {
            return { data: null, error: "Rate limit exceeded. Try again later." };
        }

        return { data: null, error: error.message || "Something went wrong." };
    }
}

export async function getUserData(username) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}`, {
            headers: HEADERS,
        });

        return { data: response.data, error: null };
    } catch (error) {
        const status = error.response?.status;

        if (status === 429 || error.message?.includes("rate limit")) {
            return { data: null, error: "Rate limit exceeded. Try again later." };
        }

        if (status === 404) {
            return { data: null, error: "User not found." };
        }

        return { data: null, error: error.message || "Something went wrong." };
    }
}
