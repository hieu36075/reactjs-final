import { isWithinInterval, parseISO, startOfDay } from 'date-fns';

const isDateBlockedISO = (date, blockedDateRangesISO) => {
    const checkedDate = startOfDay(date);
    for (const blockedRangeISO of blockedDateRangesISO) {
        const startDate = startOfDay(parseISO(blockedRangeISO.startDate));
        const endDate = startOfDay(parseISO(blockedRangeISO.endDate));

        if (isWithinInterval(checkedDate, { start: startDate, end: endDate })) {
            return true;
        }
    }
    return false;
};

export { isDateBlockedISO };
