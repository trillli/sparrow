/*
NOTE
These utils currently have narrow scope, as they were developed specifically in support of 
the DayBreakr alarm app and have not yet been expanded to support wider / more generic use cases. 
Please see the comments at each level for an explanation of their input / output
*/

//time12hr must be a string in the format of
//7:30 AM
//And output will be a string in the format of
//07:30
export const fnTime12hrTo24hr: (time12hr: string) => string = (time12hr: string) => {

    const [timeString, period] = time12hr.split(' ');
    const [hours, minutes] = timeString.split(':').map(Number);

    let hours24 = hours;
    if (period === 'PM' && hours < 12) {
        hours24 += 12;
    } else if (period === 'AM' && hours === 12) {
        hours24 = 0;
    }

    const formattedHours = String(hours24).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}` as string;
}

//Reverse of the above function, fnTime24hrTo12hr. time24hr must be a string in the format of:
//07:00
//And output will be a string in the format of
//07:30 AM
export const fnTime24hrTo12hr: (time24hr: string) => string = (time24hr: string) => {

    const [hours, minutes] = time24hr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';

    let hours12 = hours % 12;
    hours12 = hours12 || 12; // Convert 0 to 12

    const formattedHours = String(hours12).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${period}`;
}