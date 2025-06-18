import axios from "axios";

const github = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
});

export async function searchUsers(query) {
    try {
        const response = await github.get(`/search/users?q=${query}`);
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
        const response = await github.get(`/users/${username}`);
        return { data: response.data, error: null };
    } catch (error) {
        const status = error.response?.status;
        if (status === 429 || error.message?.includes("rate limit")) {
            return { data: null, error: "Rate limit exceeded. Try again later." };
        }
        return { data: null, error: error.message || "Something went wrong." };
    }
}
