export const getNextYear = (date) => {
  if (!date) {
    return null;
  }
  const dateObj = new Date(date);
  const nextYear = dateObj.getFullYear() + 1;
  let nextYearDate = new Date(nextYear, dateObj.getMonth(), dateObj.getDate());

  const offset = nextYearDate.getTimezoneOffset();
  nextYearDate = new Date(nextYearDate.getTime() - (offset*60*1000));

  return nextYearDate.toISOString().split('T')[0];
};

export const getToday = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const todayDate = new Date(today.getTime() - (offset*60*1000));
  return todayDate.toISOString().split('T')[0];
};

export const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}