"use client"

import { useState, useCallback } from "react"
import { useMountEffect } from "@/hooks/use-mount-effect"
import { cn } from "@/lib/utils"
import { useAppChrome } from "@/components/app-chrome"
import { Keyboard } from "@/components/ui/keyboard"
import { TypingTest } from "@/components/typing-test"
import { useSettings, SOUND_PACKS } from "@/components/settings-context"


export default function Page() {
  const { settingsOpen, testSettingsOpen, setTypingActive, homeLogoHandlerRef } = useAppChrome()
  const [isFinished, setIsFinished] = useState(false)
  const [typingFocused, setTypingFocused] = useState(true)
  const [restartKey, setRestartKey] = useState(0)
  const [mode, setMode] = useState<string>("time")
  const { showKeyboard, soundEnabled, soundPack, language, setSoundPackLoading } = useSettings()
  const soundPackOption = SOUND_PACKS.find((s) => s.id === soundPack)
  const soundUrl = soundPackOption?.url ?? "/sounds/sound.ogg"
  const soundConfigUrl = soundPackOption?.configUrl

  useMountEffect(() => {
    homeLogoHandlerRef.current = () => {
      setIsFinished(false)
      setRestartKey((k) => k + 1)
    }
    return () => {
      homeLogoHandlerRef.current = null
    }
  })

  const handleTypingActiveChange = useCallback(
    (active: boolean) => {
      setTypingActive(active)
    },
    [setTypingActive],
  )

  const handleKeyHighlight = useCallback((_key: string | null) => {}, [])

  const showFooter = !isFinished && showKeyboard

  return (
    
 <div className="flex min-h-[calc(100dvh-64px)] flex-col">



  {/* 🔹 CENTER AREA */}
  <main className="flex flex-1 items-center justify-center px-6">
    <div className="w-full  max-w-4xl">
      <TypingTest  />
    </div>
  </main>

  {/* 🔹 KEYBOARD */}
  {!isFinished && showKeyboard && (
    <footer className="border-t border-border py-6 flex justify-center">
      <div className="scale-[1.05]">
        <Keyboard  />
      </div>
    </footer>
  )}

</div>
  )
}
