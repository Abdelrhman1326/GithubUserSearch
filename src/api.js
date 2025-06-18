import axios from "axios";

const github = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
});

export async function searchUsers(query) {
    try {
        const { data } = await github.get(`/search/users?q=${query}`);
        return { data, error: null };
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return { data: null, error: error.message };
    }
}

export async function getUserData(username) {
    try {
        const { data } = await github.get(`/users/${username}`);
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
}
