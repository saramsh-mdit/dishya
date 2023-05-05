import React from "react";
import { useForm } from "@mantine/form";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { postRegister, register } from "../../api/post";
import { AuthContext, userType } from "../../store/Context/authContext";

const UserForm = () => {
  const navigation = useNavigate();
  const authContext = React.useContext(AuthContext);
  const form = useForm<register>({
    initialValues: {
      userName: "",
      password: "",
      email: "",
    },
    validate: {
      userName: (value) => (value ? null : "userName is required."),
      password: (value) => (value ? null : "password is required."),
      email: (value) => {
        if (!value) return "email is required.";
        const email =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.test(value)) return "invalid email";
      },
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: register) => postRegister(data),

    onSuccess: (response: any) => {
      const userData = response?.data as userType;
      authContext.dispatch({ type: "ADD_USER", payload: userData });
      localStorage.setItem("token", userData?.token!);
      form.reset();
      navigation("/login");

      // Notification
      // notifications.show({
      //   title: 'Login Successfully',
      // });
    },
    // onError: () =>
    // notifications.show({ title: 'Registered Successfully', color: 'red' }),
  });

  const submitHandler = (data: register) => {
    registerMutation.mutate(data);
  };

  return (
    <form className="grid gap-4" onSubmit={form.onSubmit(submitHandler)}>
      <TextInput
        label="Usename:"
        placeholder="Username here."
        {...form.getInputProps("userName")}
      />

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

      <Button type="submit">Register</Button>
    </form>
  );
};

export default UserForm;
