import {
    getLeftPos,
    getPixelLength,
    getStartTime,
    isNow,
} from '../utils/AppUtils';
import { TListing } from './EPGList';

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
                position: 'relative',
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
