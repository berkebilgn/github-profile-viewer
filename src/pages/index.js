import { useState } from "react";
import { getUserProfile, getUserRepos } from "../api/github";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, selectFavorites } from "../redux/favoritesSlice";

function Home() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const profileData = await getUserProfile(username);
    const reposData = await getUserRepos(username);
    setProfile(profileData);
    setRepos(reposData);
  };

  const handleFavoriteClick = (repo) => {
    dispatch(toggleFavorite(repo.id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-l-md py-2 px-4 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-r-md py-2 px-4 hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="bg-yellow-500 text-white rounded-md py-2 px-4 hover:bg-yellow-600 focus:outline-none"
        >
          Favori Repolar
        </button>
      </div>

      {profile && !showFavorites && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-24 h-24 rounded-full shadow-lg"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">@{username}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Location:</strong> {profile.location || "N/A"}
            </p>
            <p>
              <strong>Company:</strong> {profile.company || "N/A"}
            </p>
            <p>
              <strong>Public Repos:</strong> {profile.public_repos}
            </p>
            <p>
              <strong>Followers:</strong> {profile.followers}
            </p>
            <p>
              <strong>Following:</strong> {profile.following}
            </p>
          </div>
        </div>
      )}

      {!showFavorites && repos.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Repository İsmi</th>
              <th className="py-2 px-4 border-b">Oluşturulma Zamanı</th>
              <th className="py-2 px-4 border-b">Repository URL</th>
              <th className="py-2 px-4 border-b">Repository Dili</th>
              <th className="py-2 px-4 border-b">Favori</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id}>
                <td className="py-2 px-4 border-b">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {repo.name}
                  </a>
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(repo.created_at).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{repo.html_url}</td>
                <td className="py-2 px-4 border-b">{repo.language}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleFavoriteClick(repo)}
                    className={`text-xl ${
                      favorites.includes(repo.id)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showFavorites && favorites.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">Favori Repolar</h2>
          <ul>
            {repos
              .filter((repo) => favorites.includes(repo.id))
              .map((repo) => (
                <li key={repo.id} className="mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {showFavorites && favorites.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">Favori Repolar</h2>
          <p className="text-gray-600">Hiç favori repo eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
