const functionCodeToRouteMapping = new Map();

functionCodeToRouteMapping.set('sign_up', '/users/sign_up');
functionCodeToRouteMapping.set('email_avaliable', '/users/email_avaliable');
functionCodeToRouteMapping.set('name_avaliable', '/users/name_avaliable');
functionCodeToRouteMapping.set('active_account', '/users/active_account');
functionCodeToRouteMapping.set('add_role', '/roles/add_role');
functionCodeToRouteMapping.set('update_role', '/roles/update_role');
functionCodeToRouteMapping.set('get_captcha', '/captcha/get_captcha');

export default functionCodeToRouteMapping;