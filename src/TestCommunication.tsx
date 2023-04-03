import { observer } from "mobx-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { WindowLayerContext, WindowType } from "./WindowLayerProvider";
import { WindowsCommunicationServiceContext } from "./windows-communication/WindowsCommunicationServiceProvider";

const TestCommunication = observer(() => {
  const communicationService = useContext(WindowsCommunicationServiceContext);
  const { openWindow } = useContext(WindowLayerContext);
  const [windowId, setWindowId] = useState<string>("");
  const handleOpenWindowClick = () => {
    const wid = openWindow({
      type: WindowType.windowR,
    });
    setWindowId(wid);
    communicationService.createState(wid, "inputFromComponent");
  };

  return (
    <div>
      <button onClick={handleOpenWindowClick}>open window</button>
      {windowId && (
        <input
          onChange={(e) =>
            communicationService.setState(
              windowId,
              "inputFromComponent",
              e.target.value
            )
          }
        />
      )}
      {communicationService.isStateExistsInChannel(windowId, "inputFromWindow") && communicationService.getState(windowId ?? "", "inputFromWindow")}
    </div>
  );
});

export default TestCommunication;
