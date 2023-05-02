import React from "react";
import { Avatar, Button, Card, Text, Title } from "@mantine/core";
import { Icon } from "@iconify/react";

import { AuthContext } from "../../../store/Context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentByCommentId } from "../../../api/delete";
import { toast } from "react-toastify";

type commentProps = {
  commentId: string;
  userId: string;
  comment: string;
  userName: string;
  videoId: string;
};

const CommentCard = (props: commentProps) => {
  const authData = React.useContext(AuthContext);
  const queryClient = useQueryClient();
  const deleteComment = useMutation({
    mutationFn: deleteCommentByCommentId,
    onSuccess: () => {
      toast("Sucessfully Deleted Comment");
      queryClient.invalidateQueries({
        queryKey: [`comments-${props.videoId}`],
      });
    },
    onError: (e) => {
      console.log(e);
      toast("Unable to delete comment");
    },
  });

  return (
    <Card className="flex gap-4 w-full px-1">
      <Avatar variant="light" radius="md" color="cyan">
        RN
      </Avatar>
      <div className="grid gap-1 w-full">
        <div className="flex justify-between items-center p-0 m-0 flex-1">
          <Title order={6}>{props?.userName}</Title>
          {authData?.state?.user?._id === props?.userId && (
            <Button
              size="xs"
              color="red"
              variant="subtle"
              onClick={() => deleteComment.mutate(props.commentId)}
              leftIcon={<Icon icon="ic:outline-delete-outline" />}
            >
              Delete
            </Button>
          )}
        </div>
        <Text className="text-sm">{props?.comment}</Text>
      </div>
    </Card>
  );
};

export default CommentCard;
