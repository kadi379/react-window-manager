import React from "react";
import {
  windowsCommunicationService,
  WindowsCommunicationService,
} from "./WindowsCommunicationService";

export const WindowsCommunicationServiceContext = React.createContext(
  {} as WindowsCommunicationService
);

type WCSPProps = {
  children: React.ReactNode;
};
const WindowsCommunicationServiceProvider = ({ children }: WCSPProps) => {
  return (
    <WindowsCommunicationServiceContext.Provider
      value={windowsCommunicationService}
    >
      {children}
    </WindowsCommunicationServiceContext.Provider>
  );
};

export default WindowsCommunicationServiceProvider;
