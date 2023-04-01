import React, { useEffect, useState } from "react"
import { ElementPosition } from "../data/models/interfaces"
import Translatable from "./Translatable"

type DraggableProps = {
    children?: React.ReactNode
    initPos?: ElementPosition
    initZIndex?: number
    getNextZIndex: () => number
    disabled?: boolean
}
const Draggable = ({ children, initPos, initZIndex, getNextZIndex, disabled = false }: DraggableProps) => {
    const [zIndex, setZIndex] = useState<number>(initZIndex ?? 3)
    const bringToFront = () => {
        setZIndex(getNextZIndex())
    }
    return (
        <div
            style={{
                visibility: "hidden",
                position: "fixed",
                top: initPos?.top ?? "auto",
                right: initPos?.right ?? "auto",
                bottom: initPos?.bottom ?? "auto",
                left: initPos?.left ?? "auto",
                transform: `translate(
                    ${initPos?.translate?.x ?? "0px"},
                    ${initPos?.translate?.y ?? "0px"}
                  )`,
                width: "fit-content",
                height: "fit-content",
                zIndex: zIndex,
            }}
        >
            <Translatable disabled={disabled} bringToFront={bringToFront}>
                {children}
            </Translatable>
        </div>
    )
}

export default Draggable
