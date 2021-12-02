import '../styles.css';
import EPGList from './EPGList';
import TimeScale from './TimeScale';
import TimeLine from './TimeLine';
import useEPGScroll from '../hooks/useEPGScroll';
import Channels from './Channels';

type TEPG = {
    channels: any[];
    renderItem: (a: any) => JSX.Element;
    settings: any;
};

const EPG = ({ channels, renderItem, settings }: TEPG) => {
    const baseFontSize = 16;
    const {
        gridScrollWidth,
        scrollGrid,
        onScroll,
        channelRef,
        gridRef,
        timeRef,
    } = useEPGScroll(channels);

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
                    <Channels
                        ref={channelRef}
                        channels={channels}
                        settings={
                            {
                                ChannelListClass: settings.ChannelListClass,
                                ChannelIconClass: settings.ChannelIconClass,
                            } as any
                        }
                        onScroll={onScroll}
                    />
                    <div
                        className="Epg__react-grid__grid-list"
                        ref={gridRef}
                        onScroll={onScroll}
                    >
                        <TimeLine
                            fontSize={baseFontSize}
                            scrollWidth={gridScrollWidth}
                        />
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default EPG;
