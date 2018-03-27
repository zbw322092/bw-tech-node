const moment = require('moment');

export const getNowDatetime = (): string => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}