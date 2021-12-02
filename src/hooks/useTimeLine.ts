import { useEffect, useRef } from 'react';
import { getCurentTimeInEm } from '../utils/AppUtils';

const useTimeLine = (fontSize: number, scrollWidth: number) => {
    const ems = getCurentTimeInEm(fontSize);
    const ref = useRef<HTMLDivElement>(document.createElement('div'));
    useEffect(() => {
        if (!ref.current) throw Error('divRef not assigned');
        if (ref.current) {
            let { scrollWidth = 0, scrollHeight = 0 } =
                ref.current.parentElement || {};
            const extra = Math.max(4.25 * fontSize, 60) / fontSize;
            scrollWidth = scrollWidth / fontSize + 68;
            scrollHeight = scrollHeight / fontSize;
            ref.current.style.width = `${scrollWidth - ems + extra}em`;
            ref.current.style.height = `${scrollHeight}em`;
        }
    }, [scrollWidth, ems, fontSize]);

    return {
        ref,
        ems,
    };
};

export default useTimeLine;
