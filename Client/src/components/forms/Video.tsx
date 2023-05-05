import React from "react";
import {
  Button,
  FileButton,
  Group,
  MultiSelect,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getTag, tagData } from "../../api/get";
import { postVideo, video } from "../../api/post";
import { VideoUploadContext } from "../../store/Context/videoUpload";
import { toast } from "react-toastify";

type videoFormType = {
  title: string;
  description: string;
  tags: string[];
};

const VideoForm = () => {
  const [tagOptions, setTagOptions] = React.useState<string[]>([]);
  const [file, setFile] = React.useState<File | null>(null);

  const form = useForm<videoFormType>({
    initialValues: {
      title: "",
      description: "",
      tags: [],
    },
    validate: {
      title: (value) => (value ? null : "title is required."),
      description: (value) => (value ? null : "description is required."),
      tags: (value) => (value.length ? null : "tags is required."),
    },
  });
  const videoUploadContext = React.useContext(VideoUploadContext);

  const tagData = useQuery({
    queryKey: ["tagData"],
    queryFn: getTag,
    onSuccess: (d) => {
      const tagList = d.data?.data?.map((item: tagData) => item.name);
      setTagOptions(tagList);
    },
  });

  const mutation = useMutation({
    mutationFn: postVideo,
    onSuccess: (data) => {
      const videoId = data?.data?.data?._id;
      videoUploadContext.dispatch({
        type: "ADD_VIDEO_ID",
        payload: { videoId },
      });
      toast("Video Created Sucessfully");
    },
  });

  const onSubmitHandler = async (data: videoFormType) => {
    if (file) {
      try {
        let tag = "";
        data.tags.forEach((item) => (tag = `${item} ${tag}`));
        const videofile: video = {
          image: file,
          title: data.title,
          description: data.description,
          tags: tag,
        };
        mutation.mutate(videofile);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <form className="grid gap-4" onSubmit={form.onSubmit(onSubmitHandler)}>
        <TextInput
          label="Video Title:"
          placeholder="Video title here."
          {...form.getInputProps("title")}
        />

        <Textarea
          minRows={4}
          label="Video Description:"
          placeholder="Video description here."
          {...form.getInputProps("description")}
        />

        <MultiSelect
          data={tagOptions}
          label="Pick Tags"
          placeholder={
            tagData.isLoading
              ? "Loading Please Wait"
              : tagData.isError
              ? "Error Occured"
              : "Choose tags"
          }
          {...form.getInputProps("tags")}
        />
        <div className="grid gap-1">
          <Text className="text-sm text-green-600 font-semibold">
            Required:
          </Text>
          <Group position="center">
            <FileButton
              onChange={setFile}
              accept="image/jpg, image/png, image/jpeg"
            >
              {(props) => (
                <Button
                  className="w-full"
                  color="green"
                  leftIcon={<Icon icon="material-symbols:upload-rounded" />}
                  {...props}
                >
                  {file
                    ? `Picked file: ${file.name}`
                    : "Select Thumbnail Image"}
                </Button>
              )}
            </FileButton>
          </Group>
        </div>
        <Button type="submit">Create Video</Button>
      </form>
    </>
  );
};

export default VideoForm;
