import React from "react";
import { Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/Login";
import FormWrapper from "../../components/wrapper/FormWrapper";
import UserForm from "../../components/forms/User";

const RegisterPage = () => {
  return (
    <section className="grid gap-4 py-16">
        <div className="max-w-sm w-full mx-auto grid gap-4 rounded-lg shadow border border-gray-300 border-solid px-4 py-8">
            <Title className="text-center" order={2}>Register</Title>
        <UserForm />
        <Text className="text-center font-semibold">
            Already have a account? 
            <Link to="/login" className="text-blue-700 mx-1 hover:text-blue-900">Login</Link>
            </Text>
        </div>
    </section>
  );
};

export default RegisterPage;
