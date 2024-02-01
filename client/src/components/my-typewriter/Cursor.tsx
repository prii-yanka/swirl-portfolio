import { ReactNode, memo } from 'react'
import "./typewriter.css"
import React from 'react'

export type CursorProps = {
  /** Enable cursor blinking animation */
  cursorBlinking?: boolean
  /** Change cursor style */
  cursorStyle?: ReactNode
  /** Change cursor color */
  cursorColor?: string
}

const MemoizedCursor = ({
  cursorBlinking = true,
  cursorStyle = '|',
  cursorColor = 'inherit'
}: CursorProps): JSX.Element => {
  return (
    <span
      style={{ color: cursorColor }}
      className={ cursorBlinking ? 'blinkingCursor blinking' : 'blinkingCursor'
      }
    >
      {cursorStyle}
    </span>
  )
}

export const Cursor = memo(MemoizedCursor)
