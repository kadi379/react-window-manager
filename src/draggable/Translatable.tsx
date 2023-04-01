import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "hammerjs"

const getMinShownPixels = (dims: { height: number; width: number }) => {
    const minShownPerc = 0.2
    const minShownPixels = 20
    return Math.min(Math.max(dims.height, dims.width) * minShownPerc, minShownPixels)
}

type TranslatableProps = {
    children: React.ReactNode
    bringToFront: () => void
    disabled?: boolean
}
const Translatable = ({ children, bringToFront, disabled }: TranslatableProps) => {
    const [translate, setTranslate] = useState({ x: 0, y: 0 })
    const [lastDelta, setLastDelta] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [listenersInited, setListenersInited] = useState(false)

    const translatableRef = useRef<HTMLDivElement>(null!)
    const mcRef = useRef<HammerManager>()
    const lastDeltaRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    lastDeltaRef.current = lastDelta

    const { initX, initY } = useMemo(() => {
        const elOffset = (
            translatableRef.current?.firstChild as HTMLElement
        )?.getBoundingClientRect()
        return { initX: elOffset?.x ?? 0, initY: elOffset?.y ?? 0 }
    }, [translatableRef.current])

    const handlePanStart = useCallback((e: HammerInput) => {
        bringToFront()
        setLastDelta({ x: 0, y: 0 })
        setIsDragging(true)
    }, [])
    const handlePanMove = useCallback((e: HammerInput) => {
        setTranslate((prev) => ({
            x: prev.x + e.deltaX - lastDeltaRef.current.x,
            y: prev.y + e.deltaY - lastDeltaRef.current.y,
        }))
        setLastDelta({
            x: e.deltaX,
            y: e.deltaY,
        })
    }, [])
    const handlePanEnd = useCallback((e: HammerInput) => {
        setIsDragging(false)
    }, [])
    useEffect(() => {
        if (disabled || !listenersInited) return
        if (!isDragging) {
            const elOffset = translatableRef.current.getBoundingClientRect()
            const dims = {
                height: translatableRef.current.offsetHeight,
                width: translatableRef.current.offsetWidth,
            }
            const minShownPixels = getMinShownPixels(dims)
            let correctedTranslate = { x: translate.x, y: translate.y }
            let translateWasCorrected = false
            if (document.documentElement.scrollWidth - elOffset.left < minShownPixels) {
                correctedTranslate = {
                    ...correctedTranslate,
                    x: document.documentElement.scrollWidth - initX - minShownPixels,
                }
                translateWasCorrected = true
            } else if (elOffset.right < minShownPixels) {
                correctedTranslate = {
                    ...correctedTranslate,
                    x: -1 * initX - dims.width + minShownPixels,
                }
                translateWasCorrected = true
            }
            if (document.documentElement.scrollHeight - elOffset.top < minShownPixels) {
                correctedTranslate = {
                    ...correctedTranslate,
                    y: document.documentElement.scrollHeight - initY - minShownPixels,
                }
                translateWasCorrected = true
            } else if (elOffset.bottom < minShownPixels) {
                correctedTranslate = {
                    ...correctedTranslate,
                    y: -1 * initY - dims.height + minShownPixels,
                }
                translateWasCorrected = true
            }

            if (translateWasCorrected) {
                setTranslate(correctedTranslate)
            }
        }
    }, [isDragging])

    useEffect(() => {
        if (translatableRef?.current && !listenersInited && !disabled) {
            setListenersInited(true)
            mcRef.current = new Hammer(translatableRef?.current)
            mcRef.current.get("pan").set({ direction: Hammer.DIRECTION_ALL })
            mcRef.current.on("panstart", handlePanStart)
            mcRef.current.on("panmove", handlePanMove)
            mcRef.current.on("panend", handlePanEnd)
        }
    }, [])

    const removeListeners = () => {
        if (disabled || !listenersInited) return
        mcRef.current?.off("panstart", handlePanStart)
        mcRef.current?.off("panmove", handlePanMove)
        mcRef.current?.off("panend", handlePanEnd)
        mcRef.current?.destroy()
    }
    useEffect(() => {
        return removeListeners
    }, [])

    return (
        <div
            ref={translatableRef}
            style={{
                visibility: "visible",
                transform: `translate(${translate.x}px,${translate.y}px)`,
            }}
            onClick={bringToFront}
        >
            {children}
        </div>
    )
}

export default Translatable
