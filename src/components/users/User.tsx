import { FC } from "react";
import { TUser } from "../../types/User";

type UserProps = {
  user: TUser;
};

const User: FC<UserProps> = ({ user: { username } }) => {
  return <div>{username}</div>;
};

export default User;
