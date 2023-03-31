import React from "react"
import "./window-frames.scss"
type WindowFrameAProps = {
    onClose: () => void
    children: React.ReactNode
}
const WindowFrameR = ({ onClose, children }: WindowFrameAProps) => {
    return (
        <div className="window-frame-r-wrapper">
            <div className="top-bar">
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default WindowFrameR
