import { TListing } from '../components/EPGList';
const PROGRAMME_PIXEL_LENGTH_PER_HOUR = 328;
export const generateTime = () => {
    const x = 30; //minutes interval
    const times = []; // time array
    let tt = 0; // start time
    const ap = ['AM', 'PM']; // AM-PM

    //loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
        const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        const mm = tt % 60; // getting minutes of the hour in 0-55 format
        times[i] =
            ('0' + (hh % 12)).slice(-2) +
            ':' +
            ('0' + mm).slice(-2) +
            ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }
    times.push(times[0]);
    return times;
};

export const getPixelLength = (programme: TListing, baseFontSize = 16) => {
    const startTime = new Date(programme.end).getTime();
    const endTime = new Date(programme.start).getTime();
    const diff = endTime - startTime;
    const hours = diff / (1000 * 60 * 60);
    return (PROGRAMME_PIXEL_LENGTH_PER_HOUR / baseFontSize) * hours;
};

export const isNow = (programme: TListing) => {
    const startTime = new Date(programme.start).getTime();
    const endTime = new Date(programme.end).getTime();
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

export const getStartTime = (programme: TListing) => {
    const startTime = new Date(programme.start).getTime();
    const endTime = new Date(programme.end).getTime();
    return `${new Date(startTime).getHours()}:${new Date(
        startTime
    ).getMinutes()}-${new Date(endTime).getHours()}:${new Date(
        endTime
    ).getMinutes()}`;
};

export const getLeftPos = (programme: TListing, baseFontSize = 16) => {
    const startTime = new Date(programme.start).getTime();
    const d = new Date(startTime);
    return (
        (d.getHours() + d.getMinutes() / 60) *
        (PROGRAMME_PIXEL_LENGTH_PER_HOUR / baseFontSize)
    );
};

export const getCurentTimeInEm = (fontSize: number) => {
    const date = new Date();
    const totalHrs = date.getHours() + date.getMinutes() / 60;
    return totalHrs * (PROGRAMME_PIXEL_LENGTH_PER_HOUR / fontSize);
};
