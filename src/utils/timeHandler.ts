const moment = require('moment-timezone');

export const getCurrentDatetime = (): string => {
  return moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}