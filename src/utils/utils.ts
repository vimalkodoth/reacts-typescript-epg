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
