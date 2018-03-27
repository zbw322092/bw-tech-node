/**
 * Code taken and adapted from uniqid.
 * URL: https://github.com/adamhalasz/uniqid
 */

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
const pid = process && process.pid ? process.pid.toString(36) : '';
const mac = require('macaddress').one(macHandler);
const address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '';

//  Exports
// ================================================
export function uniqid(prefix?: string): string { return (prefix || '') + address + pid + now().toString(36); }
export function uniqidProcess(prefix?: string): string { return (prefix || '') + pid + now().toString(36); }
export function uniqidTime(prefix?: string): string { return (prefix || '') + now().toString(36); }

//  Helpers
// ================================================
function now(): number {
  const time = Date.now();
  const last = (now as any).last || time;
  return (now as any).last = time > last ? time : last + 1;
}

function macHandler(error): void {
  if (module.parent && (module.parent as any).uniqid_debug) {
    if (error) console.error('Info: No mac address - uniqid() falls back to uniqid.process().', error)
    if (pid == '') console.error('Info: No process.pid - uniqid.process() falls back to uniqid.time().')
  }
}