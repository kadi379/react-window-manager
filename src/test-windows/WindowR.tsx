import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import "./test-windows.scss";
import { WindowsCommunicationServiceContext } from "../windows-communication/WindowsCommunicationServiceProvider";

type WindowRProps = {
  id: string;
};
const WindowR = observer(({ id }: WindowRProps) => {
  const communicationService = useContext(WindowsCommunicationServiceContext);

  useEffect(() => {
    communicationService.createState(id, "inputFromWindow");
  }, []);

  return (
    <div className="window-r">
      <div>{communicationService.getState(id, "inputFromComponent")}</div>
      <input
        onChange={(e) =>
          communicationService.setState(id, "inputFromWindow", e.target.value)
        }
      />
    </div>
  );
});

export default WindowR;
