const startDate = new Date();
const endDate = new Date();
endDate.setDate(startDate.getDate() + 1);


const defaultDate = [
  {
    startDate,
    endDate,
  },
];
const defaultOptions = {
  adult: 1,
  children: 0,
  room: 1,
};

export { defaultDate, defaultOptions };