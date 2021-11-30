import React from 'react';
import { generateTime } from '../utils/AppUtils';

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
