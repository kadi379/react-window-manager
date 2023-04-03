import { observer } from "mobx-react";
import React from "react";
import "./test-windows.scss";

type WindowBProps = {
  id: string;
};
const WindowB = observer(({ id }: WindowBProps) => {
  return <div className="window-b">WindowB</div>;
});

export default WindowB;
