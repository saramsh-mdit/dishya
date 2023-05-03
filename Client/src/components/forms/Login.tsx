import React from "react";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { Button, PasswordInput, TextInput } from "@mantine/core";

import { login, postLogin } from "../../api/post";
import { AuthContext, userType } from "../../store/Context/authContext";

const LoginForm = () => {
  const authContext = React.useContext(AuthContext);
  const form = useForm<login>({
    initialValues: {
      password: "",
      email: "",
    },
    validate: {
      password: (value) => (value ? null : "password is required."),
      email: (value) => {
        if (!value) return "email is required.";
        const email =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.test(value)) return "invalid email";
      },
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: login) => postLogin(data),

    onSuccess: (response: any) => {
      const userData = response?.data as userType;
      authContext.dispatch({ type: "ADD_USER", payload: userData });
      localStorage.setItem("token", userData?.token!);
      form.reset();
      // Notification
      toast("Login Sucessfully");
      window.location.href = "/profile";
    },
    onError: () => toast("Login Failed"),
  });

  const submitHandler = (data: login) => {
    loginMutation.mutate(data);
  };
  return (
    <form className="grid gap-4" onSubmit={form.onSubmit(submitHandler)}>
      <TextInput
        label="Email:"
        placeholder="Email here."
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password:"
        placeholder="Password here."
        {...form.getInputProps("password")}
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
