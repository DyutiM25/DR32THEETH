import {createContext, useContext, useState, useEffect} from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/auth/profile");
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
                console.error("Failed to fetch user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const login = async (identifier, password) => {
        const res = await api.post("/auth/login", {identifier, password});
        setUser(res.data.user);
    }

    const logout = async () =>
    {
        awaitapi.post("/auth/logout");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
            {children}
            </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);