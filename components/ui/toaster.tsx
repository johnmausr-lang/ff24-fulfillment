// src/components/ui/toaster.tsx
"use client"

import * as React from "react"
import { toast, Toaster as Sonner } from "sonner"

const Toaster = ({
  position = "bottom-center",
  closeButton = true,
  expand = false,
  theme,
  richColors = true,
}: {
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  closeButton?: boolean
  expand?: boolean
  theme?: "light" | "dark" | "system"
  richColors?: boolean
}) => {
  return (
    <Sonner
      theme={theme}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      position={position}
      closeButton={closeButton}
      expand={expand}
      richColors={richColors}
    />
  )
}

export { Toaster }
