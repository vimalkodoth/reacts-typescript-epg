import React, { useEffect, useRef } from 'react';

type TTimeLine = {
    fontSize: number;
};

const PROGRAMME_PIXEL_LENGTH_PER_HOUR = 328;

const getCurentTimeInEm = (fontSize: number) => {
    const date = new Date();
    const totalHrs = date.getHours() + date.getMinutes() / 60;
    return totalHrs * (PROGRAMME_PIXEL_LENGTH_PER_HOUR / fontSize);
};
const TimeLine = ({ fontSize }: TTimeLine) => {
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
    }, [fontSize, ems]);

    return (
        <div className="TimeLine" ref={timelineWrapperRef}>
            <div
                className="TimeLine__timeline"
                style={{ left: `${ems}em` }}
            ></div>
        </div>
    );
};

export default TimeLine;
