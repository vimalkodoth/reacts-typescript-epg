import { useEffect, useState } from 'react';

const useFetch = (endpoint: string) => {
    const [data, setData] = useState([] as object[]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                setData(data.channels);
            } catch (e) {
                setIsError(true);
            }
        })();
    }, [endpoint]);

    return {
        data,
        isError,
    };
};

export default useFetch;
