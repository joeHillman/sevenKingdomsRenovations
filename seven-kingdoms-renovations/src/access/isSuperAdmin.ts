import { Access, FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isSuperAdmin: Access<any, User> = ({req: { user }}) => {
  // return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('superAdmin'));
}

export const isSuperAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({ req: { user } }) => {
  // return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('superAdmin'));
}
