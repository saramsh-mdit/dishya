import { Title } from "@mantine/core";
import React from "react";

type PropType = {
  children: React.ReactNode;
  title?: string;
};

const FormWrapper: React.FC<PropType> = ({ children, title }) => {
  return (
    <section className="p-4 mx-auto grid gap-2 w-full max-w-lg">
      {title && <Title order={3}>{title}</Title>}
      {children}
    </section>
  );
};

export default FormWrapper;
