import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Text, Title } from "@mantine/core";

import { Heading } from "./../../components/global/Typography/index";

const teamList = ["Aashish Shrestha", "Samip Gautam", "Saramsh Shrestha"];

const About = () => {
  return (
    <div className="grid w-100 h-100 justify-center px-10 py-20">
      <div className="pr-8 flex gap-4 items-center justify-center text-blue-400 ">
        <Icon icon="ic:outline-remove-red-eye" className="text-7xl" />
        <Heading className="text-center">Drishya</Heading>
      </div>
      <div className="description grid my-3 gap-4 text-center max-w-lg">
        <p className="text-lg text-gray-800">
          Drishya is a video platform that is powered by node ecosystem and
          build with popular algorithm of cosin similarity.{" "}
        </p>
        <Title order={3} className="text-blue-400">
          Team Members:
        </Title>
        <div className="grid gap-2 max-w-md mx-auto text-left">
          {teamList.map((item) => (
            <Text className="font-semibold text-gray-800">-{item}</Text>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
