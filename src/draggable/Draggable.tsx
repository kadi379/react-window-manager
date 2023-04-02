import React, { useEffect, useState } from "react"
import { ElementPosition } from "../data/models/interfaces"
import Translatable from "./Translatable"

type DraggableProps = {
    children?: React.ReactNode
    initPos?: ElementPosition
    getNextHighestZIndex: () => number
    disabled?: boolean
}
const Draggable = ({ children, initPos, getNextHighestZIndex, disabled = false }: DraggableProps) => {
    const [zIndex, setZIndex] = useState<number>(3)
    const bringToFront = () => {
        setZIndex(getNextHighestZIndex())
    }
    useEffect(() => {
        bringToFront()
    }, [])
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
