import { TListing } from './EPGList';

const PROGRAMME_PIXEL_LENGTH_PER_HOUR = 328;
const getPixelLength = (programme: TListing, baseFontSize = 16) => {
    const startTime = new Date(programme.end).getTime();
    const endTime = new Date(programme.start).getTime();
    const diff = endTime - startTime;
    const hours = diff / (1000 * 60 * 60);
    return (PROGRAMME_PIXEL_LENGTH_PER_HOUR / baseFontSize) * hours;
};

const isNow = (programme: TListing) => {
    const startTime = new Date(programme.end).getTime();
    const endTime = new Date(programme.start).getTime();
    if (
        programme &&
        programme.hasOwnProperty('startTime') &&
        programme.hasOwnProperty('endTime')
    ) {
        const currentTime = Date.now();
        return startTime <= currentTime && endTime >= currentTime;
    }
    return false;
};

const getStartTime = (programme: TListing) => {
    const startTime = new Date(programme.start).getTime();
    const endTime = new Date(programme.end).getTime();
    return `${new Date(startTime).getHours()}:${new Date(
        startTime
    ).getMinutes()}-${new Date(endTime).getHours()}:${new Date(
        endTime
    ).getMinutes()}`;
};

const getLeftPos = (programme: TListing, baseFontSize = 16) => {
    const startTime = new Date(programme.start).getTime();
    const d = new Date(startTime);
    return (
        (d.getHours() + d.getMinutes() / 60) *
        (PROGRAMME_PIXEL_LENGTH_PER_HOUR / baseFontSize)
    );
};

type TEPGProgramme = {
    data: TListing;
    renderItem: (a: any) => JSX.Element;
    baseFontSize: number;
    programmeClass: string;
    currentProgrammeClass: string;
};
const EPGProgramme = ({
    data,
    renderItem,
    baseFontSize,
    programmeClass,
    currentProgrammeClass,
}: TEPGProgramme) => {
    const pixelLength = getPixelLength(data, baseFontSize);
    const leftPos = getLeftPos(data, baseFontSize) || 'auto';
    return (
        <div
            className={`EpgProgramme${
                isNow(data)
                    ? `EpgProgramme--onnow ${
                          currentProgrammeClass
                              ? ` ${currentProgrammeClass}`
                              : ''
                      }`
                    : ''
            }${programmeClass ? ` ${programmeClass}` : ''}`}
            style={{
                position: 'absolute',
                width: `${pixelLength}em`,
                left: `${leftPos}em`,
            }}
        >
            {renderItem ? (
                renderItem(data)
            ) : (
                <>
                    <div>{data.title}</div>
                    <div>{getStartTime(data)}</div>
                </>
            )}
        </div>
    );
};

export default EPGProgramme;
