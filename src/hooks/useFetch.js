import { useState, useEffect } from "react";

export default function useFetch(url, options = {}) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url, options);
                if (!res.ok) {
                    throw new Error(`Error en la solicitud: ${res.status} - ${res.statusText}`);
                }
                const data = await res.json();
                setResult(data);
                setLoading(false);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error };
}