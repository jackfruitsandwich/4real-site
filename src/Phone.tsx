import type { CSSProperties, ReactNode } from 'react'
import { StatusGlyphs } from './Icons'
import './phone.css'

/*
  Port of GlassPhoneMock.swift. The screen is a 430×932 logical canvas
  (iPhone 15 Pro Max); every length inside is in points via --pt, so one
  variable scales the whole device.
*/

export function PhoneFrame({
  children,
  style,
  className = '',
  glass = true,
}: {
  children: ReactNode
  style?: CSSProperties
  className?: string
  glass?: boolean
}) {
  return (
    <div className={`phone ${className}`} style={style}>
      <span className="phone-btn phone-btn-l1" />
      <span className="phone-btn phone-btn-l2" />
      <span className="phone-btn phone-btn-l3" />
      <span className="phone-btn phone-btn-r" />
      <div className="phone-body">
        <div className="phone-bezel" />
        <div className="phone-screen">
          {children}
          {glass && <div className="phone-glass" />}
        </div>
        <div className="phone-island" />
      </div>
    </div>
  )
}

/* PhoneStatusBar from OnboardingStorySlide.swift, placed on the device's real status row */
export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`status ${light ? 'status-light' : ''}`}>
      <span className="status-time">9:41</span>
      <StatusGlyphs light={light} />
    </div>
  )
}
