const functionCodeToRouteMapping = new Map();

/* ------------------------------ users ---------------------------------- */
functionCodeToRouteMapping.set('sign_in', '/users/sign_in');
functionCodeToRouteMapping.set('sign_out', '/users/sign_out');
functionCodeToRouteMapping.set('sign_up', '/users/sign_up');
functionCodeToRouteMapping.set('email_avaliable', '/users/email_avaliable');
functionCodeToRouteMapping.set('name_avaliable', '/users/name_avaliable');
functionCodeToRouteMapping.set('active_account', '/users/active_account');
/* ------------------------------ roles ---------------------------------- */
functionCodeToRouteMapping.set('add_role', '/roles/add_role');
functionCodeToRouteMapping.set('update_role', '/roles/update_role');
/* ------------------------------ captcha ---------------------------------- */
functionCodeToRouteMapping.set('get_captcha', '/captcha/get_captcha');
/* ------------------------------ permission ---------------------------------- */
functionCodeToRouteMapping.set('add_permission', '/permission/add_permission');
functionCodeToRouteMapping.set('add_permission_role', '/permissionrole/add_permission_role');
/* ------------------------------ rolesusers ---------------------------------- */
functionCodeToRouteMapping.set('add_roles_users', '/rolesusers/add_roles_users');
functionCodeToRouteMapping.set('update_roles_users', '/rolesusers/update_roles_users');
/* ------------------------------ posts ---------------------------------- */
functionCodeToRouteMapping.set('create_post', '/posts/create_post');
functionCodeToRouteMapping.set('faker_generate_post', '/posts/faker_generate_post');
/* ------------------------------ tags ---------------------------------- */
functionCodeToRouteMapping.set('add_tag', '/tags/add_tag');
/* ------------------------------ poststags ---------------------------------- */
functionCodeToRouteMapping.set('add_post_tag', '/poststags/add_post_tag');

export default functionCodeToRouteMapping;