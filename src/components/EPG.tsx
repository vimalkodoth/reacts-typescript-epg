import '../styles.css';
import EPGList from './EPGList';
import TimeScale from './TimeScale';
import TimeLine from './TimeLine';
import useEPGScroll from '../hooks/useEPGScroll';
import Channels from './Channels';
import { getCurentTimeInPixels } from '../utils/AppUtils';
import Button from './Button';

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

    const onButtonClick = (e: any) => {
        const currentTime = getCurentTimeInPixels();
        if (!gridRef.current) return;
        const bounding = gridRef.current
            .querySelector('.TimeLine__timeline')
            ?.getBoundingClientRect();
        if (!bounding) return;
        const viewPortWidth =
            window.innerWidth || document.documentElement.clientWidth;
        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.left + 5 <= viewPortWidth // assuming 5 pixels wide
        )
            return;
        if (currentTime - gridRef.current.scrollLeft >= 0) {
            gridRef.current.scrollLeft =
                currentTime - gridRef.current.scrollLeft;
            gridRef.current.scrollLeft =
                gridRef.current.scrollLeft + gridRef.current.clientWidth / 2;
        } else {
            gridRef.current.scrollLeft ==
                -(gridRef.current.scrollLeft - currentTime) +
                    gridRef.current.clientWidth / 2;
        }
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
                    <Button onClick={onButtonClick}>Now</Button>
                </div>
            </div>
        </>
    );
};

export default EPG;
