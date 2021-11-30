import { useRef, useCallback, useEffect, UIEvent } from 'react';
import '../styles.css';
import EPGList from './EPGList';
import TimeScale from './TimeScale';
import TimeLine from './TimeLine';
import useEPGScroll from '../hooks/useEPGScroll';

type TEPG = {
    channels: any[];
    renderItem: (a: any) => JSX.Element;
    settings: any;
};

const EPG = ({ channels, renderItem, settings }: TEPG) => {
    const baseFontSize = 16;
    const { scrollGrid, onScroll, channelRef, gridRef, timeRef } =
        useEPGScroll();

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
                                    key={item.id}
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
