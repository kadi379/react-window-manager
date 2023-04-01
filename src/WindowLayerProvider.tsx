import React, { useMemo, useState } from "react"
import WindowR from "./test-windows/WindowR"
import WindowG from "./test-windows/WindowG"
import WindowB from "./test-windows/WindowB"
import WindowFrameR from "./window-frames/WindowFrameR"
import WindowFrameG from "./window-frames/WindowFrameG"
import { ElementPosition } from "./data/models/interfaces"
import Draggable from "./draggable/Draggable"

export enum WindowType {
    windowR,
    windowG,
    windowB,
}

export enum WindowFrameType {
    windowFrameR,
    windowFrameG,
}

type WindowParams = {
    type: WindowType
    props?: Record<string, any>
    frame?: WindowFrameType
    initPos?: ElementPosition
}

type AppWindow = { id: string } & WindowParams

type WindowLayerContextState = {
    openWindow: (params: WindowParams) => string
    closeWindow: (windowId: string) => void
}

export const WindowLayerContext = React.createContext({} as WindowLayerContextState)

type WindowLayerProviderProps = {
    children: React.ReactNode
}
const WindowLayerProvider = ({ children }: WindowLayerProviderProps) => {
    const [openWindows, setOpenWindows] = useState<AppWindow[]>([])
    const [windowsIds, setWindowsIds] = useState<string[]>([])
    const [highestZIndex, setHighestZIndex] = useState<number>(3)

    const generateWindowId = () => {
        const newId = Date.now().toString()
        setWindowsIds([...windowsIds, newId])
        return newId
    }

    const getNextZIndex = () => {
        setHighestZIndex(prev => prev + 1)
        return highestZIndex
    }

    const openWindow = (params: WindowParams) => {
        const windowId = generateWindowId()
        setOpenWindows([
            ...openWindows,
            {
                id: windowId,
                type: params.type,
                initPos: params.initPos,
                props: params.props,
                frame: params.frame,
            },
        ])
        return windowId
    }
    const closeWindow = (windowId: string) => {
        setOpenWindows((prev) => prev.filter((w) => w.id !== windowId))
    }
    const createWindow = (window: AppWindow) => {
        let content = <></>
        switch (window.type) {
            case WindowType.windowR:
                content = <WindowR {...window.props} />
                break
            case WindowType.windowG:
                content = <WindowG {...window.props} />
                break
            case WindowType.windowB:
                content = <WindowB {...window.props} />
                break
        }
        let frame = <></>
        switch (window.frame) {
            default:
            case WindowFrameType.windowFrameR:
                frame = (
                    <WindowFrameR onClose={() => closeWindow(window.id)}>{content}</WindowFrameR>
                )
                break
            case WindowFrameType.windowFrameG:
                frame = (
                    <WindowFrameG onClose={() => closeWindow(window.id)}>{content}</WindowFrameG>
                )
                break
        }
        return <Draggable initPos={window.initPos} getNextZIndex={getNextZIndex}>{frame}</Draggable>
    }

    return (
        <WindowLayerContext.Provider
            value={{
                openWindow,
                closeWindow,
            }}
        >
            {children}
            {openWindows.map((w) => (
                <React.Fragment key={w.id}>{createWindow(w)}</React.Fragment>
            ))}
        </WindowLayerContext.Provider>
    )
}

export default WindowLayerProvider
