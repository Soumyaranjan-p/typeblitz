"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { useMountEffect } from "@/hooks/use-mount-effect"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "motion/react"

import { DynamicFavicon } from "@/components/dynamic-favicon"
import { SettingsPanel } from "@/components/settings-panel"
import { cn } from "@/lib/utils"
import { useClickSound } from "@/hooks/use-click-sound"

interface AppChromeContextValue {
  settingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  testSettingsOpen: boolean
  setTestSettingsOpen: (open: boolean) => void
  typingActive: boolean
  setTypingActive: (active: boolean) => void
  homeLogoHandlerRef: React.MutableRefObject<(() => void) | null>
}

const AppChromeContext = createContext<AppChromeContextValue | null>(null)

export function useAppChrome() {
  const ctx = useContext(AppChromeContext)
  if (!ctx)
    throw new Error("useAppChrome must be used within AppChrome")
  return ctx
}

export function AppChrome({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [testSettingsOpen, setTestSettingsOpen] = useState(false)
  const [typingActive, setTypingActive] = useState(false)
  const [keyboardInset, setKeyboardInset] = useState(0)
  const homeLogoHandlerRef = useRef<(() => void) | null>(null)
  useClickSound()

  useEffect(() => {
    if (typeof window === "undefined") return
    const vv = window.visualViewport
    if (!vv) return
    let baseHeight = vv.height
    const onResize = () => {
      const delta = baseHeight - vv.height
      if (delta > 100) {
        setKeyboardInset(delta)
      } else {
        baseHeight = Math.max(baseHeight, vv.height)
        setKeyboardInset(0)
      }
    }
    vv.addEventListener("resize", onResize)
    return () => vv.removeEventListener("resize", onResize)
  }, [])

  useMountEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {})
    }
  })

  const value = useMemo(
    () => ({
      settingsOpen,
      setSettingsOpen,
      testSettingsOpen,
      setTestSettingsOpen,
      typingActive,
      setTypingActive,
      homeLogoHandlerRef,
    }),
    [settingsOpen, testSettingsOpen, typingActive],
  )

  const keyboardOpen = keyboardInset > 0

  return (
    <AppChromeContext.Provider value={value}>
      <DynamicFavicon />
      <motion.div
        initial={false}
        animate={{
          height: keyboardOpen ? `calc(100dvh - ${keyboardInset}px)` : "100dvh",
          opacity: keyboardOpen ? [0.9, 1] : 1,
          y: keyboardOpen ? [14, 0] : 0,
        }}
        transition={{
          height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
        }}
        className="flex w-full flex-col bg-background"
        style={{ minHeight: keyboardOpen ? 0 : "100dvh" }}
      >
        <SiteHeader />
        {children}
      </motion.div>
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </AppChromeContext.Provider>
  )
}

function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { typingActive, homeLogoHandlerRef } = useAppChrome()

  const isHome = pathname === "/"
  const dimHeader = isHome && typingActive

  const [mouseHeaderVisible, setMouseHeaderVisible] = useState(false)
  const headerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const headerVisible =
    !isHome || !typingActive || (isHome && typingActive && mouseHeaderVisible)

  const handleHeaderMouseMove = useCallback(() => {
    if (!isHome || !typingActive) return
    setMouseHeaderVisible(true)
    if (headerTimerRef.current) clearTimeout(headerTimerRef.current)
    headerTimerRef.current = setTimeout(
      () => setMouseHeaderVisible(false),
      2500,
    )
  }, [isHome, typingActive])

  useMountEffect(() => {
    return () => {
      if (headerTimerRef.current) clearTimeout(headerTimerRef.current)
    }
  })

  function handleLogoClick() {
    if (isHome && homeLogoHandlerRef.current) {
      homeLogoHandlerRef.current()
      return
    }
    router.push("/")
  }

  return (
    <motion.header
      animate={{ opacity: dimHeader ? (headerVisible ? 1 : 0.1) : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onMouseMove={handleHeaderMouseMove}
      className="flex shrink-0 justify-center border-b border-border px-6 py-3"
    >
      <div className="flex w-full max-w-5xl items-center justify-between">

        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          {isHome ? (
            <button
              type="button"
              onClick={handleLogoClick}
              className="cursor-pointer font-(family-name:--font-doto) text-xl font-bold text-primary"
            >
              TypeBlitz
            </button>
          ) : (
            <Link
              href="/"
              className="font-(family-name:--font-doto) text-xl font-bold text-primary"
            >
              TypeBlitz
            </Link>
          )}
        </div>

        {/* Right - Navigation */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link
            href="/about"
            className={cn(
              "hover:text-foreground transition-colors",
              pathname === "/about" && "text-foreground"
            )}
          >
            About
          </Link>
        </div>

      </div>
    </motion.header>
  )
}