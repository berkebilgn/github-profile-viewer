// src/api/github.js

import axios from "axios";

const getUserProfile = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

const getUserRepos = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  const sortedData = response.data.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return sortedData;
};

export { getUserProfile, getUserRepos };
