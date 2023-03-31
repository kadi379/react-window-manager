import React, { useMemo, useState } from "react"
import WindowR from "./test-windows/WindowR"
import WindowG from "./test-windows/WindowG"
import WindowB from "./test-windows/WindowB"
import WindowFrameR from "./window-frames/WindowFrameR"
import WindowFrameG from "./window-frames/WindowFrameG"

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

    const generateWindowId = () => {
        const newId = Date.now().toString()
        setWindowsIds([...windowsIds, newId])
        return newId
    }

    const openWindow = (params: WindowParams) => {
        const windowId = generateWindowId()
        setOpenWindows([
            ...openWindows,
            { id: windowId, type: params.type, props: params.props, frame: params.frame },
        ])
        return windowId
    }
    const closeWindow = (windowId: string) => {
        setOpenWindows((prev) => prev.filter((w) => w.id !== windowId))
    }
    const createWindow = (window: AppWindow) => {
        let children = <></>
        switch (window.type) {
            case WindowType.windowR:
                children = <WindowR {...window.props} />
                break
            case WindowType.windowG:
                children = <WindowG {...window.props} />
                break
            case WindowType.windowB:
                children = <WindowB {...window.props} />
                break
        }
        switch (window.frame) {
            default:
            case WindowFrameType.windowFrameR:
                return <WindowFrameR onClose={() => closeWindow(window.id)} children={children} />
            case WindowFrameType.windowFrameG:
                return <WindowFrameG onClose={() => closeWindow(window.id)} children={children} />
        }
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
