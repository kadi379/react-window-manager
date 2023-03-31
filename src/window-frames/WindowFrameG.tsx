import React from "react"
import "./window-frames.scss"
type WindowFrameBProps = {
    onClose: () => void
    children: React.ReactNode
}
const WindowFrameG = ({ onClose, children }: WindowFrameBProps) => {
    return (
        <div className="window-frame-g-wrapper">
            <div className="top-bar">
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default WindowFrameG
