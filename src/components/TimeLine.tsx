import React, { useEffect, useRef } from 'react';
import { getCurentTimeInEm } from '../utils/AppUtils';

type TTimeLine = {
    fontSize: number;
    scrollWidth: number;
};

const TimeLine = ({ fontSize, scrollWidth }: TTimeLine) => {
    const ems = getCurentTimeInEm(fontSize);
    const timelineWrapperRef = useRef<HTMLDivElement>(
        document.createElement('div')
    );
    useEffect(() => {
        if (!timelineWrapperRef.current) throw Error('divRef not assigned');
        if (timelineWrapperRef.current) {
            let { scrollWidth = 0, scrollHeight = 0 } =
                timelineWrapperRef.current.parentElement || {};
            const extra = Math.max(4.25 * fontSize, 60) / fontSize;
            scrollWidth = scrollWidth / fontSize + 68;
            scrollHeight = scrollHeight / fontSize;
            timelineWrapperRef.current.style.width = `${
                scrollWidth - ems + extra
            }em`;
            timelineWrapperRef.current.style.height = `${scrollHeight}em`;
        }
    }, [scrollWidth]);

    return (
        <div className="TimeLine" ref={timelineWrapperRef}>
            <div
                className="TimeLine__timeline"
                style={{ left: `${ems}em` }}
                ref={timelineWrapperRef}
            ></div>
        </div>
    );
};

export default TimeLine;
