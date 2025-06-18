import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "./api.js";
import { useSearch } from "./Context/SearchContext.jsx";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { FaGithub } from "react-icons/fa";
import User from "./User.jsx";
import './App.css';

const Body = () => {
    const { search } = useSearch();
    const debouncedSearch = useDebouncedValue(search, 500);

    const { data, isLoading } = useQuery({
        queryKey: ["search-users", debouncedSearch],
        queryFn: () => searchUsers(debouncedSearch),
        enabled: debouncedSearch.trim().length > 0,
        staleTime: Infinity,
    });

    if (isLoading) {
        return (
            <div className="body-container">
                <p>Loading users...</p>
            </div>
        );
    }

    if (data?.error) {
        // If rate limit exceeded, show a specific message
        const isRateLimit = data.error.toLowerCase().includes("rate limit");
        return (
            <div className="body-container">
                <p style={{ color: "crimson", fontWeight: "bold" }}>
                    {isRateLimit ? "🚫 Request rate exceeded. Try again in a few minutes." : data.error}
                </p>
            </div>
        );
    }

    const users = data?.data?.items || [];

    return (
        <div className="body-container">
            {users.length === 0 ? (
                debouncedSearch.trim().length === 0 ? (
                    <div className="starter">
                        <FaGithub style={{ fontSize: "10rem", color: "#242424" }} />
                        <p style={{ fontSize: "1.3rem", color: "#434343" }}>Start Your Search</p>
                    </div>
                ) : (
                    <p style={{ fontSize: "1.5rem", color: "#434343" }}>No users found</p>
                )
            ) : (
                <div className="user-grid">
                    {users.map((user) => (
                        <User key={user.id} username={user.login} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Body;
