const moment = require('moment-timezone');

export const getNowDatetime = (): string => {
  return moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}