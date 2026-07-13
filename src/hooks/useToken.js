import { useEffect, useState } from "react";

export function useToken() {
    const [token, setToken] = useState(() =>
        localStorage.getItem("token")
    );

    useEffect(() => {
        const handler = () => {
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("auth-change", handler);
        window.addEventListener("storage", handler);

        return () => {
            window.removeEventListener("auth-change", handler);
            window.removeEventListener("storage", handler);
        };
    }, []);

    return token;
}
