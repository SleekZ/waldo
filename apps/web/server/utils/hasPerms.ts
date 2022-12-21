export enum Perms {
  isOwner = 0,
  roleMod = 1,
  roleAdmin = 2,
}

export enum Roles {
  User = 0,
  Mod = 1,
  Admin = 2,
}

/**
 * Checks if a user has the proper perms to access the resources of an endpoint
 * @param param0
 * @returns if user has the proper perms
 */
export function hasPerms({
  userId,
  userRole,
  itemOwnerId,
  requiredPerms,
  blacklisted,
}: {
  /**
   * User's id
   */
  userId: string;
  /**
   * The user's role within Waldo, most people will be a 'User'
   * Only staff with have something else
   */
  userRole: Roles;
  /**
   * If requesting access to a "owned" resource like gameplay or clips
   * this is the owner of that resource
   */
  itemOwnerId?: string;
  /**
   * The require permission level
   */
  requiredPerms?: Perms;
  /**
   * If user is blacklisted
   */
  blacklisted: boolean;
}): boolean {
  // if blacklisted immediately deny
  if (blacklisted) return false;
  // if user owns the item
  else if (userId === itemOwnerId) return true;
  // if userRole is greater than or equal to the required perms
  else if (requiredPerms && userRole >= requiredPerms) return true;

  // TODO: blacklist check

  return false;
}
