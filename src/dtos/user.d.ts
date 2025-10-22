type UserAPIRole = "admin" | "tech" | "client";

type UserAPIResponse = {
  token: string;
  role: UserAPIRole;
  id: string;
  name: string;
  email: string;
};
