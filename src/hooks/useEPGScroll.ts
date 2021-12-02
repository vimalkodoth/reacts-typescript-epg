import { useCallback, useEffect, UIEvent, useRef, useState } from 'react';

const useEPGScroll = (channels: any) => {
    const [gridScrollWidth, setGridScrollWidth] = useState(0);
    const channelRef = useRef<HTMLDivElement>(document.createElement('div'));
    const gridRef = useRef<HTMLDivElement>(document.createElement('div'));
    const timeRef = useRef<HTMLDivElement>(document.createElement('div'));
    const stateRef = useRef({} as any);
    const gridListRef = useRef<HTMLDivElement>(document.createElement('div'));
    useEffect(() => {
        if (!gridListRef.current) return;
        gridListRef.current.style.width = `${timeRef.current.scrollWidth}px`;
        gridListRef.current.style.maxWidth = `${timeRef.current.scrollWidth}px`;
        gridListRef.current.style.overflow = 'hidden';
    }, [gridListRef, timeRef]);

    useEffect(() => {
        console.log(gridRef.current.scrollWidth);
        setGridScrollWidth(gridRef.current.scrollWidth);
    }, [channels]);

    const update = () => {
        const lastKnownScrollTop = stateRef.current.scrollTop;
        channelRef.current.scrollTop = lastKnownScrollTop;
        gridRef.current.scrollTop = lastKnownScrollTop;
        timeRef.current.scrollLeft = gridRef.current.scrollLeft;
        stateRef.current.scrollTicking = false;
    };

    const requestTick = () => {
        if (!stateRef.current.scrollTicking) {
            requestAnimationFrame(update);
        }
        stateRef.current.scrollTicking = true;
    };
    const updateLeftTick = () => {
        const lastKnownScrollLeft = stateRef.current.scrollLeft;
        gridRef.current.scrollLeft = lastKnownScrollLeft;
        timeRef.current.scrollLeft = gridRef.current.scrollLeft;
        stateRef.current.scrollLeftTicking = false;
    };
    const requestTickLeft = () => {
        if (!stateRef.current.scrollLeftTicking) {
            requestAnimationFrame(updateLeftTick);
        }
        stateRef.current.scrollLeftTicking = true;
    };

    const debouncedRequestTick = useCallback(requestTick, []);

    const debouncedRequestTickLeft = useCallback(requestTickLeft, []);

    const onScroll = (e: UIEvent<HTMLDivElement>) => {
        if (!channelRef.current || !e.target) return;
        stateRef.current.scrollTop = (e.target as HTMLDivElement).scrollTop;
        debouncedRequestTick();
    };

    const scrollGrid = (e: UIEvent<HTMLDivElement>) => {
        stateRef.current.scrollLeft = (e.target as HTMLDivElement).scrollLeft;
        debouncedRequestTickLeft();
    };

    return {
        gridScrollWidth,
        scrollGrid,
        onScroll,
        channelRef,
        gridRef,
        timeRef,
    };
};

export default useEPGScroll;
