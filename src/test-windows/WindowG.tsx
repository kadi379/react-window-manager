import { observer } from "mobx-react";
import React from "react";
import "./test-windows.scss";

type WindowGProps = {
  id: string;
};
const WindowG = observer(({ id }: WindowGProps) => {
  return <div className="window-g">WindowG</div>;
});

export default WindowG;
