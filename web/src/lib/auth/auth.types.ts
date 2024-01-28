type RegistrationData = {
  iin: string;
  firstName: string;
  lastName: string;
  password: string;
};

type LoginData = {
  iin: string;
  password: string;
};

type UserData = {
  iin: string;
  userId: number;
};

export type { RegistrationData, LoginData, UserData };
