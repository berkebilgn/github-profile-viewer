import { useState } from "react";
import { getUserProfile, getUserRepos } from "../api/github";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

function Home() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

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
    <div>
      <input
        type="text"
        placeholder="GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.location}</p>
        </div>
      )}

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>

      {repos.length > 0 && (
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
                    // className={`text-xl ${
                    //   favorites.includes(repo.id)
                    //     ? "text-yellow-500"
                    //     : "text-gray-400"
                    // }`}
                  >
                    ★
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
