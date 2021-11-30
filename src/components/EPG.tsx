import { useRef, useCallback, useEffect, UIEvent } from 'react';
import '../styles.css';
import EPGList from './EPGList';
import TimeScale from './TimeScale';
import TimeLine from './TimeLine';

type TEPG = {
    channels: any[];
    renderItem: (a: any) => JSX.Element;
    settings: any;
};

const EPG = ({ channels, renderItem, settings }: TEPG) => {
    const channelRef = useRef<HTMLDivElement>(document.createElement('div'));
    const gridRef = useRef<HTMLDivElement>(document.createElement('div'));
    const timeRef = useRef<HTMLDivElement>(document.createElement('div'));
    const stateRef = useRef({} as any);
    const gridListRef = useRef<HTMLDivElement>(document.createElement('div'));
    const baseFontSize = 16;
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

    return (
        <>
            <div
                className={`Epg${
                    settings.EPGClass ? ` ${settings.EPGClass}` : ''
                }`}
            >
                <TimeScale
                    onScroll={scrollGrid}
                    ref={timeRef}
                    fontSize={baseFontSize}
                    cssClasses={{
                        timeScaleStampClass: settings.TimeScaleStampClass,
                        timeScaleSeparatorClass:
                            settings.TimeScaleSeparatorClass,
                        timeScaleClass: settings.TimeScaleClass,
                    }}
                />
                <div className="Epg__react-grid">
                    <div
                        className={`Epg__react-grid__channel-list${
                            settings.ChannelListClass
                                ? ` ${settings.ChannelListClass}`
                                : ''
                        }`}
                        ref={channelRef}
                        onScroll={onScroll}
                    >
                        {channels.map((item) => {
                            return (
                                <div
                                    className={`Epg__react-grid__channel-list__channel-ico${
                                        settings.ChannelIconClass
                                            ? ` ${settings.ChannelIconClass}`
                                            : ''
                                    }`}
                                    key={item.id}
                                >
                                    <img
                                        src={
                                            'http://s3-eu-west-1.amazonaws.com/rockettv.media.images/popcorn/images/channels/v3/logos/default/MB1_176.png'
                                        }
                                        alt=""
                                        width={75}
                                        height={75}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div
                        className="Epg__react-grid__grid-list"
                        ref={gridRef}
                        onScroll={onScroll}
                    >
                        {/* <div className="Epg__react-grid__grid_wrapper" ref={gridListRef}> */}
                        <TimeLine fontSize={baseFontSize} />
                        {channels.map((item: any) => {
                            const schedules = item.schedules;
                            return (
                                <div
                                    className="Epg__react-grid__grid-list__grid-item"
                                    key={item.channelID}
                                >
                                    <EPGList
                                        listings={schedules}
                                        renderItem={renderItem}
                                        baseFontSize={baseFontSize}
                                        programmeClass={settings.ProgammeClass}
                                        currentProgrammeClass={
                                            settings.CurrentProgrammeClass
                                        }
                                    />
                                </div>
                            );
                        })}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EPG;
