import { useEffect, useState } from "react";
import { useToken } from "./useToken";
import { strapi } from "../../config";

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const token = useToken();

    useEffect(() => {
        async function checkAuth() {
            if (!token) {
                setIsLoggedIn(false);
                return;
            }

            try {
                const res = await strapi.get("/users/me", { headers: { Authorization: token, }, });

                console.log(res.data);
                if (res?.data?.id) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }

            } catch (error) {
                setIsLoggedIn(false);
            }
        }

        checkAuth();
    }, [token]);

    return isLoggedIn;
}
