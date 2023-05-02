import React from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../api/post";
import { toast } from "react-toastify";

type CommmentType = {
  comment: string;
  videoId: string;
};

const CommentForm = ({ videoId }: { videoId: string }) => {
  const queryClient = useQueryClient();
  const form = useForm<CommmentType>({
    initialValues: {
      comment: "",
      videoId: videoId,
    },
    validate: {
      comment: (value) => (value ? null : "comment is required."),
      videoId: (value) => (value ? null : "videoId is required."),
    },
  });

  const commentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      toast("Sucessfully comment");
      queryClient.invalidateQueries({ queryKey: [`comments-${videoId}`] });
      form.reset();
    },
    onError: (e) => {
      console.log(e);
      toast("Unable to add comment");
    },
  });
  const submitHandler = (data: CommmentType) => {
    commentMutation.mutate(data);
  };
  return (
    <form className="flex gap-4" onSubmit={form.onSubmit(submitHandler)}>
      <TextInput
        className="w-full"
        placeholder="your comment here."
        {...form.getInputProps("comment")}
      />
      <Button type="submit">Comment</Button>
    </form>
  );
};

export default CommentForm;
