export const getTodayUTC = () => {
  const today = new Date();
  // Set the start of the day (00:00:00.000) in local time
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );

  // Set the end of the day (23:59:59.999) in local time
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
    999
  );

  return [
    startOfDay.toISOString().replace("T", " "),
    endOfDay.toISOString().replace("T", " "),
  ];
};
