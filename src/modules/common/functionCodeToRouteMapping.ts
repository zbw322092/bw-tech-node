const functionCodeToRouteMapping = new Map();

functionCodeToRouteMapping.set('signup', '/auth/signup');
functionCodeToRouteMapping.set('email_avaliable', '/auth/email_avaliable');
functionCodeToRouteMapping.set('name_avaliable', '/auth/name_avaliable');
functionCodeToRouteMapping.set('add_role', '/roles/add_role');
functionCodeToRouteMapping.set('update_role', '/roles/update_role');
functionCodeToRouteMapping.set('get_captcha', '/captcha/get_captcha');

export default functionCodeToRouteMapping;