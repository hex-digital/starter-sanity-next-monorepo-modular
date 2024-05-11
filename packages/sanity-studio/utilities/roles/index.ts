import { CurrentUser as SanityCurrentUser } from 'sanity';
import { ROLE } from '../../constants/roles';

/** currentUser.role is deprecated - use currentUser.roles instead */
type CurrentUser = Omit<SanityCurrentUser, 'role'>;

export function isDeveloper(currentUser: CurrentUser | null) {
  const allowedRoles = [
    ROLE.ADMINISTRATOR,
    ROLE.DEVELOPER,
  ];

  return isValidRole(allowedRoles, currentUser);
}

export function isAdmin(currentUser: CurrentUser | null) {
  const allowedRoles = [
    ROLE.ADMINISTRATOR,
  ];

  return isValidRole(allowedRoles, currentUser);
}

export function isValidRole(roles: Array<ROLE>, currentUser: CurrentUser | null) {
  return currentUser?.roles.some((role) => roles.includes(role.name as ROLE));
}
