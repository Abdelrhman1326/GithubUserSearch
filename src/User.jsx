import { getUserData } from "./api.js";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiUserPlus, FiFolder } from "react-icons/fi";

const User = ({ username }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["user", username],
        queryFn: () => getUserData(username),
        enabled: !!username,
        staleTime: Infinity,
    });

    if (isLoading) return <p>Loading {username}...</p>;
    if (error || data?.error) return <p>Error loading {username}</p>;

    const user = data.data;
    const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    return (
        <div className="user-card">
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
            <h3>{user.name || user.login}</h3>

            <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#3b82f6", fontWeight: "500" }}
            >
                @{user.login}
            </a>

            {user.bio && <p>{user.bio}</p>}
            {user.location && <p>📍 {user.location}</p>}
            <p>📅 Joined {joinDate}</p>

            <div className="user-stats">
                <div>
                    <strong><FiUsers /> {user.followers}</strong>
                    <span>Followers</span>
                </div>
                <div>
                    <strong><FiUserPlus /> {user.following}</strong>
                    <span>Following</span>
                </div>
                <div>
                    <strong><FiFolder /> {user.public_repos}</strong>
                    <span>Repos</span>
                </div>
            </div>
        </div>
    );
};

export default User;
