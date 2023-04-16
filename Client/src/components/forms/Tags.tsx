import React from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, Title } from "@mantine/core";
import { postTag } from "../../api/post";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

type TagType = {
  name: string;
};

const TagForm = () => {
  const form = useForm<TagType>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value ? null : "tag name is required."),
    },
  });

  const tagMutation = useMutation({
    mutationFn: (data: TagType) => postTag(data),

    onSuccess: (response: any) => {
      const userData = response?.data as TagType;
      form.reset();
      // Notification
      toast("Tag Added Sucessfully");
    },
    onError: () => toast("Failed"),
  });

  const SubmitHandler = (d: TagType) => {
    tagMutation.mutate(d);
  };
  return (
    <div className="grid gap-1 mt-4">
      <Title order={5}>Create Custom Tag (optional)</Title>
      <form
        className="flex gap-4 items-end"
        onSubmit={form.onSubmit(SubmitHandler)}
      >
        <TextInput
          className="w-full"
          placeholder="Eg: music, movie"
          {...form.getInputProps("name")}
        />
        <Button type="submit" color="green">
          Add Tag
        </Button>
      </form>
    </div>
  );
};

export default TagForm;
