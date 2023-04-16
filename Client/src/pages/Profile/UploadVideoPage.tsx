import React, { useContext } from "react";

import { Button, Stepper, Text, Title } from "@mantine/core";
import PageWrapper from "../../components/wrapper/PageWrapper";
import VideoForm from "../../components/forms/Video";
import VideoUpload from "../../components/forms/VideoUpload";
import FormWrapper from "../../components/wrapper/FormWrapper";
import { VideoUploadContext } from "../../store/Context/videoUpload";
import { Link } from "react-router-dom";

const UploadVideoPage = () => {
  const VideoUploadContextData = useContext(VideoUploadContext);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (VideoUploadContextData.state.currentState === "started") setActive(0);
    if (VideoUploadContextData.state.currentState === "created") setActive(1);
    if (VideoUploadContextData.state.currentState === "complete") setActive(2);
  });

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <PageWrapper>
      <section className="grid gap-4 p-4">
        <Stepper
          size="xs"
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
        >
          <Stepper.Step label={<Text className="text-sm">Step 1: Create</Text>}>
            <VideoFormStep />
          </Stepper.Step>
          <Stepper.Step label={<Text className="text-sm">Step 2: Upload</Text>}>
            <UploadVideoFormStep
              videoId={VideoUploadContextData?.state?.videoId}
            />
          </Stepper.Step>
          <Stepper.Step
            label={<Text className="text-sm">Step 3: Complete</Text>}
          >
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            <div className="grid gap-8 mx-4 my-8 justify-center">
              <Title className="text-blue-500 text-center">
                Congratilations <br />
                Video Uploaded Sucessfully
              </Title>

              <Button className="mx-8">
                <Link to="/profile" className="text-white">
                  Go Back to Profile
                </Link>
              </Button>
            </div>
          </Stepper.Completed>
        </Stepper>
      </section>
    </PageWrapper>
  );
};

export default UploadVideoPage;

export const VideoFormStep = () => {
  return (
    <FormWrapper title="Enter Video Details">
      <VideoForm />
    </FormWrapper>
  );
};

export const UploadVideoFormStep = ({ videoId }: { videoId: string }) => {
  return (
    <FormWrapper title="Upload Video">
      <VideoUpload videoId={videoId} />
    </FormWrapper>
  );
};
