const functionCodeToRouteMapping = new Map();

functionCodeToRouteMapping.set('signup', '/auth/signup');
functionCodeToRouteMapping.set('add_role', '/roles/add_role');
functionCodeToRouteMapping.set('update_role', '/roles/update_role');

export default functionCodeToRouteMapping;