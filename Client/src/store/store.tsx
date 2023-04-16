import { AuthContextProvider } from './Context/authContext';
import { VideoUploadContextProvider } from './Context/videoUpload';

export type ChildrenProp = { children: React.ReactNode };

const ContextStore = ({ children }: ChildrenProp) => {
  return (
    <AuthContextProvider>
      <VideoUploadContextProvider>{children}</VideoUploadContextProvider>
    </AuthContextProvider>
  );
};
export default ContextStore;
