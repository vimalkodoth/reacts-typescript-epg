import React from 'react';

function generateTime() {
    const x = 30; //minutes interval
    const times = []; // time array
    let tt = 0; // start time
    const ap = ['AM', 'PM']; // AM-PM

    //loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
        const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        const mm = tt % 60; // getting minutes of the hour in 0-55 format
        times[i] =
            ('0' + (hh % 12)).slice(-2) +
            ':' +
            ('0' + mm).slice(-2) +
            ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    times.push(times[0]);
    return times;
}

type TTimeScale = {
    onScroll: (a: any) => void;
    fontSize: number;
    cssClasses: object;
    children?: React.ReactNode;
};

type TcssClasses = {
    timeScaleStampClass: string;
    timeScaleSeparatorClass: string;
    timeScaleClass: string;
};
const TimeScale = React.forwardRef<HTMLDivElement, TTimeScale>(
    ({ onScroll, fontSize = 16, cssClasses }, ref) => {
        const times = generateTime();
        const { timeScaleStampClass, timeScaleSeparatorClass, timeScaleClass } =
            cssClasses as TcssClasses;
        return (
            <div
                className={`TimeScale${
                    timeScaleClass ? ` ${timeScaleClass}` : ''
                }`}
            >
                <div className="TimeScale__inner" onScroll={onScroll} ref={ref}>
                    {(() => {
                        let emSize = -(100 / fontSize);
                        return times.map((time, index) => {
                            emSize = emSize + 100 / fontSize;
                            return (
                                <div
                                    className="TimeScale__inner__text"
                                    style={{
                                        position: 'relative',
                                        left: `${emSize}em`,
                                    }}
                                    key={`${time}-${index}`}
                                >
                                    <div
                                        className={`TimeScale__inner__text__curr-time${
                                            timeScaleStampClass
                                                ? ` ${timeScaleStampClass}`
                                                : ''
                                        }`}
                                    >
                                        {time}
                                    </div>
                                    <div
                                        className={`TimeScale__inner__text__separator${
                                            timeScaleSeparatorClass
                                                ? ` ${timeScaleSeparatorClass}`
                                                : ''
                                        }`}
                                    >
                                        |
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>
        );
    }
);

TimeScale.displayName = 'TimeScale';

export default TimeScale;
