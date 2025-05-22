import { useMemo } from "react";
import { token } from "../utils/constants";

export const useOptions = () => {
    return useMemo(() => ({
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    }), [token]);
};
