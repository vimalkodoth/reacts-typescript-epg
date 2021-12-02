import React from 'react';
import { TSettings } from './App';

type TChannels = {
    channels: any[];
    settings: TSettings;
    onScroll: (e: any) => void;
    children?: React.ReactNode;
};

const Channels = React.forwardRef<HTMLDivElement, TChannels>(
    ({ channels, settings, onScroll }, channelRef) => {
        return (
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
        );
    }
);

Channels.displayName = 'Channels';

export default Channels;
