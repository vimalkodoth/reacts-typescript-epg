import { useCallback, useEffect, UIEvent, useRef } from 'react';

const useEPGScroll = () => {
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
        scrollGrid,
        onScroll,
        channelRef,
        gridRef,
        timeRef,
    };
};

export default useEPGScroll;
