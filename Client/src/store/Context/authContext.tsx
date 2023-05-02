import React from "react";
import { ChildrenProp } from "../store";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../api/get";

export type userType = {
  userName: string;
  email: string;
  _id: string;
  token: string | null;
  dateCreated: Date;
};

type stateType = {
  user: userType;
  currentState: "authorized" | "unauthorized";
};

type ActionType = {
  type: "ADD_USER" | "LOG_OUT" | "INVALID";
  payload?: userType;
};

type VideoContextType = {
  state: stateType;
  dispatch: (obj: ActionType) => void;
};

// InitialState
const InitialState: stateType = {
  user: {
    userName: "Guest User",
    email: "guest@user.com",
    _id: "",
    token: localStorage.getItem("token") ?? null,
    dateCreated: new Date(),
  },
  currentState: "unauthorized",
};

export const AuthContext = React.createContext<VideoContextType>({
  state: InitialState,
  dispatch: (obj: ActionType) => {},
});

const AuthReducer = (state: stateType, action: ActionType): stateType => {
  switch (action.type) {
    case "ADD_USER":
      return {
        user: { ...action.payload! },
        currentState: "authorized",
      };
    case "INVALID":
      return {
        user: { ...InitialState.user },
        currentState: "unauthorized",
      };
    case "LOG_OUT":
      return {
        user: { ...InitialState.user },
        currentState: "unauthorized",
      };
  }
};

export const AuthContextProvider = ({ children }: ChildrenProp) => {
  const [state, dispatch] = React.useReducer(AuthReducer, InitialState);
  useQuery({
    queryKey: ["userInfo"],
    queryFn: getMyInfo,
    onSuccess: (data) => {
      const userData: userType = data?.data?.data;
      dispatch({ type: "ADD_USER", payload: userData });
    },
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
