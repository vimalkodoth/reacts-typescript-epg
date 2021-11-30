import '../styles.css';
import EPG from './EPG';
import useFetch from '../hooks/useFetch';

type TSettings = {
    EPGClass: string;
    ChannelListClass: string;
    ChannelIconClass: string;
    ProgammeClass: string;
    TimeScaleClass: string;
    TimeScaleStampClass: string;
    TimeScaleSeparatorClass: string;
    CurrentProgrammeClass: string;
};

const App = (): JSX.Element => {
    const { data = [], isError } = useFetch('http://localhost:1337/epg');
    const settings: TSettings = {
        EPGClass: 'epg',
        ChannelListClass: 'channel-list',
        ChannelIconClass: 'channel',
        ProgammeClass: 'programme',
        TimeScaleClass: 'time-scale',
        TimeScaleStampClass: 'current-time',
        TimeScaleSeparatorClass: 'separator',
        CurrentProgrammeClass: 'current-program',
    };

    if (isError)
        return <div>Some error has occured. try reloading the app</div>;

    return (
        <div className="App">
            <div className="container">
                <EPG
                    channels={data}
                    settings={settings}
                    renderItem={(data: any) => {
                        return (
                            <>
                                <div>{data.title}</div>
                            </>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default App;
