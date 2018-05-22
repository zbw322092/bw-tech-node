const functionCodeToRouteMapping = new Map();

functionCodeToRouteMapping.set('sign_up', '/users/sign_up');
functionCodeToRouteMapping.set('email_avaliable', '/users/email_avaliable');
functionCodeToRouteMapping.set('name_avaliable', '/users/name_avaliable');
functionCodeToRouteMapping.set('active_account', '/users/active_account');
functionCodeToRouteMapping.set('add_role', '/roles/add_role');
functionCodeToRouteMapping.set('update_role', '/roles/update_role');
functionCodeToRouteMapping.set('get_captcha', '/captcha/get_captcha');
functionCodeToRouteMapping.set('sign_in', '/users/sign_in');
functionCodeToRouteMapping.set('sign_out', '/users/sign_out');
functionCodeToRouteMapping.set('add_permission', '/permission/add_permission');
functionCodeToRouteMapping.set('add_permission_role', '/permissionrole/add_permission_role');
functionCodeToRouteMapping.set('add_roles_users', '/rolesusers/add_roles_users');
functionCodeToRouteMapping.set('update_roles_users', '/rolesusers/update_roles_users');
functionCodeToRouteMapping.set('create_post', '/posts/create_post');
functionCodeToRouteMapping.set('add_tag', '/tags/add_tag');
functionCodeToRouteMapping.set('add_post_tag', '/poststags/add_post_tag');

export default functionCodeToRouteMapping;