import React from 'react';
import { ChildrenProp } from '../store';


type stateType = {
  videoId: string | '';
  currentState: 'started' | 'created' | 'complete';
};

type ActionType = {
  type: 'ADD_VIDEO_ID' | 'RESET' | 'COMPLETE';
  payload?: {
    videoId: string;
  };
};

type VideoContextType = {
    state: stateType,
    dispatch: (obj:ActionType)=> void
};


// InitialState
const InitialState: stateType = {
  videoId: '',
  currentState: 'started',
};

export const VideoUploadContext = React.createContext<VideoContextType>({
  state: InitialState,
  dispatch:(obj:ActionType)=>{}
});

const VideoUploadReducer = (
  state: stateType,
  action: ActionType
): stateType => {
  switch (action.type) {
    case 'ADD_VIDEO_ID':
      return {
        currentState: 'created',
        videoId: action.payload?.videoId as string,
      };
    case 'COMPLETE':
      return {
        ...state,
        currentState: 'complete',
      };
    case 'RESET':
      return {
        currentState: 'started',
        videoId: '',
      };
  }
};

export const VideoUploadContextProvider = ({ children }: ChildrenProp) => {
  const [state, dispatch] = React.useReducer(VideoUploadReducer, InitialState);


  return (
    <VideoUploadContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoUploadContext.Provider>
  );
};
