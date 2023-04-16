import React from "react";

import CommentForm from "../../components/forms/Comment";
import TagForm from "../../components/forms/Tags";
import UserForm from "../../components/forms/User";
import VideoForm from "../../components/forms/Video";
import VideoUpload from "../../components/forms/VideoUpload";
import FormWrapper from "../../components/wrapper/FormWrapper";

const FormPage = () => {
  return (
    <div className="grid gap-4">
      <FormWrapper title="Create Video">
        <VideoForm />
      </FormWrapper>
      <FormWrapper>
        <CommentForm videoId="random" />
      </FormWrapper>
      <FormWrapper title="Video upload">
        <VideoUpload videoId="random" />
      </FormWrapper>
      <FormWrapper title="Add new tags">
        <TagForm />
      </FormWrapper>
      <FormWrapper title="Registration Form">
        <UserForm />
      </FormWrapper>

    </div>
  );
};

export default FormPage;
