import { isWithinInterval } from "date-fns";
const isDateBlockedISO = (date, blockedDateRangesISO) => {
    for (const blockedRangeISO of blockedDateRangesISO) {
      const startDateISO = blockedRangeISO.startDate;
      const endDateISO = blockedRangeISO.endDate;
      const currentDateISO = date.toISOString();

      if (currentDateISO >= startDateISO && currentDateISO <= endDateISO) {
        return true;
      }
    }
    return false;
  };
  
export { isDateBlockedISO };