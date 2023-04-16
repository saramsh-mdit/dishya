import React from "react";
import { Button, FileButton, Group, Text } from "@mantine/core";
import { Icon } from "@iconify/react";
import { VideoUploadContext } from "../../store/Context/videoUpload";
import { useMutation } from "@tanstack/react-query";
import { UploadVideo, videoFile } from "../../api/post";
import { toast } from "react-toastify";

const VideoUpload = ({ videoId }: { videoId: string }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const videoUploadContext = React.useContext(VideoUploadContext);

  const mutation = useMutation({
    mutationFn: UploadVideo,
    onSuccess: (data) => {
      videoUploadContext.dispatch({
        type: "COMPLETE",
      });
      toast("Video Uploaded Sucessfully");
    },
  });

  const uploadHandler = () => {
    if (file && videoId) {
      const newUploadVideo: videoFile = {
        video: file,
        videoId,
      };
      mutation.mutate(newUploadVideo);
    }
  };

  return (
    <div className="grid gap-4">
      <Group position="center">
        <FileButton onChange={setFile} accept="video/mp4,video/mkv,video/webm">
          {(props) => (
            <Button
              color="green"
              leftIcon={<Icon icon="material-symbols:upload-rounded" />}
              {...props}
            >
              Select Video
            </Button>
          )}
        </FileButton>
      </Group>
      {file && (
        <Text size="sm" align="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
      <Button loading={isUploading} onClick={uploadHandler}>
        {isUploading ? "Uploading" : "Upload"}
      </Button>
    </div>
  );
};

export default VideoUpload;
