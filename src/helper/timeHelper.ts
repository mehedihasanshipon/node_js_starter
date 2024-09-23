import { parseISO } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import moment from 'moment-timezone';
/**
 * Covert timezone
 * @param {String/Date} inputTime
 * @param {String} currentTimezone = 'UTC'
 * @param {String} convertTimezone = ''
 * @param {String} formatPattern = 'yyyy-MM-dd HH:mm:ss'
 * @returns {string}
 */

export const convertTimezone = (
    inputTime: string | Date,
    currentTimezone = 'EST',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    convertTimezone = '',
    formatPattern = 'yyyy-MM-dd HH:mm:ss'
) => {
    try {
        if (convertTimezone === '') {
            // eslint-disable-next-line no-param-reassign
            convertTimezone = currentTimezone;
        }
        let currentTimeInGivenTimezone;

        if (currentTimezone === 'UTC') {
            currentTimeInGivenTimezone = utcToZonedTime(inputTime, convertTimezone);
        } else {
            currentTimeInGivenTimezone = zonedTimeToUtc(inputTime, currentTimezone);
            // if (convertTimezone === 'UTC') {
            //     currentTimeInGivenTimezone = currentTimezoneToUtc;
            // } else {
            //     currentTimeInGivenTimezone = utcToZonedTime(currentTimezoneToUtc, convertTimezone);
            // }
        }
        return format(currentTimeInGivenTimezone, formatPattern, { timeZone: convertTimezone });
    } catch (e) {
        return format(new Date(), formatPattern);
    }
};
/**
 * format time
 * @param {String/Date} time
 * @param {String} formatPattern = 'yyyy-MM-dd HH:mm:ss'
 * @returns {string}
 */
export const formatTime = (
    time: string | Date | undefined = new Date(),
    formatPattern = 'yyyy-MM-dd HH:mm:ss'
) => {
    let newDate: string | Date = new Date();
    if (typeof time !== undefined) {
        // eslint-disable-next-line no-param-reassign
        newDate = new Date(time);
    }
    if (typeof time !== 'string') {
        return format(newDate, formatPattern);
    }
    return format(new Date(newDate), formatPattern);
};
/**
 * Parse date or string to date instance
 * @param {String/Date} time
 * @returns {Date}
 */
export const parseTime = (time: string | Date) => {
    if (typeof time !== 'string') {
        return time;
    }
    return parseISO(time);
};

export const convertToUserTimeZone = (utcTime: string, userTimeZone: string) => {
    const utcDate = new Date(utcTime);
    const userDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));
    const formattedTime = userDate
        .toISOString()
        .replace('T', ' ')
        .replace(/\.\d{3}Z$/, '');
    return formattedTime;
};

export const convertToUtcTimeZone = (utcTime: string, userTimeZone: string) =>
    moment.tz(utcTime, userTimeZone).utc().format('YYYY-MM-DD HH:mm');
export const convertToUtcTimeZoneOld = (userTime: string) => {
    const userDate = new Date(userTime);
    const utcDate = new Date(userDate.toLocaleString('en-US'));
    const formattedTime = utcDate
        .toISOString()
        .replace('T', ' ')
        .replace(/\.\d{3}Z$/, '');
    return formattedTime;
};
export const convertPdfDateFormat = (dueDate: string) => {
    console.log(dueDate, 'dueDate');
    const formattedTime = format(new Date(dueDate), 'EEE MMM dd, yyyy');
    return formattedTime;
};
