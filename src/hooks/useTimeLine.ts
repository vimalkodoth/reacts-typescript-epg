import { useEffect, useRef } from 'react';
import { getCurentTimeInEm } from '../utils/AppUtils';

const useTimeLine = (fontSize: number, scrollWidth: number) => {
    const ems = getCurentTimeInEm(fontSize);
    const ref = useRef<HTMLDivElement>(document.createElement('div'));
    useEffect(() => {
        if (!ref.current) throw Error('divRef not assigned');
        if (ref.current) {
            let { scrollHeight = 0 } = ref.current.parentElement || {};
            let width = scrollWidth;
            const extra = Math.max(4.25 * fontSize, 60) / fontSize;
            scrollHeight = scrollHeight / fontSize;
            width = width / fontSize;
            ref.current.style.width = `${width - ems + extra}em`;
            ref.current.style.height = `${scrollHeight}em`;
            ref.current.style.left = `${ems}em`;
        }
    }, [scrollWidth, ems, fontSize]);

    return {
        ref,
        ems,
    };
};

export default useTimeLine;
