import { User } from "./../store";
export const userPermisson = () => {
  const allowedRolles = ["admin", "manager"];

  const _hasedPermisson = (user: User | null) => {
    if (user) {
      return allowedRolles.includes(user.role);
    }
    return false;
  };
  return { isAllowed: _hasedPermisson };
};
