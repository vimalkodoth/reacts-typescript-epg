import EPGProgramme from './EPGProgramme';

export type TListing = {
    title: string;
    id: string;
    start: string;
    end: string;
};

type TEPGList = {
    listings: TListing[];
    renderItem: (a: any) => JSX.Element;
    baseFontSize: number;
    programmeClass: string;
    currentProgrammeClass: string;
};
const EPGList = ({
    listings = [],
    renderItem,
    baseFontSize,
    programmeClass,
    currentProgrammeClass,
}: TEPGList) => {
    return (
        <div className="EpgList">
            {listings.map((programme) => {
                return (
                    <EPGProgramme
                        renderItem={renderItem}
                        data={programme}
                        key={`${programme.id}-${programme.start}`}
                        baseFontSize={baseFontSize}
                        programmeClass={programmeClass}
                        currentProgrammeClass={currentProgrammeClass}
                    />
                );
            })}
        </div>
    );
};

export default EPGList;
