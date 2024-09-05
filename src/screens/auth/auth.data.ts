export type Input = {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

export const inputDataLogin: Input[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];

export const inputDataRegister: Input[] = [
  {
    name: "fullName",
    type: "text",
    placeholder: "Full Name",
    required: true,
  },
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    required: true,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];

export const inputDataEmail: Input[] = [
  {
    name: "code",
    type: "number",
    placeholder: "Code",
    required: true,
  },
];
