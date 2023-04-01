import React, { useContext } from "react"
import { WindowFrameType, WindowLayerContext, WindowType } from "./WindowLayerProvider"

const Test = () => {
    const { openWindow } = useContext(WindowLayerContext)
    return (
        <div className="test-wrapper">
            <button
                onClick={() =>
                    openWindow({
                        type: WindowType.windowR,
                        initPos: { top: -50, left: 50 },
                        frame: WindowFrameType.windowFrameR,
                    })
                }
            >
                window r - frame r
            </button>
            <button
                onClick={() =>
                    openWindow({ type: WindowType.windowB, frame: WindowFrameType.windowFrameG })
                }
            >
                window b - frame g
            </button>
            <button
                onClick={() =>
                    openWindow({ type: WindowType.windowG, initPos: { top: 500, left: 500 } })
                }
            >
                window g - frame default (r)
            </button>
        </div>
    )
}

export default Test
