// src/components/ui/use-toast.ts
import * as React from "react"

import { toast as sonner } from "sonner"

export type ToastAction = Record<string, unknown>

export type ToastActions<T extends ToastAction = ToastAction> = {
  [K in keyof T]?: (payload: T[K] & { id: string }) => unknown
}

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastAction
  variant?: "default" | "destructive"
  duration?: number
}

export type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastAction
  variant?: "default" | "destructive"
  duration?: number
}

export type Toaster = {
  toasts: Toast[]
  dismiss: (id: string) => void
  add: (toast: Toast) => void
  update: (id: string, options: ToastOptions) => void
  dismissAll: () => void
}

export type UseToast = {
  toast: (options: ToastOptions) => void
  dismiss: (id?: string) => void
  dismissAll: () => void
}

const ACTION_ID = Symbol("TOAST_ACTION_ID")

const useToast = (): UseToast => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((options: ToastOptions = {}) => {
    const id = Math.random().toString()

    const toast = {
      id,
      ...options,
      variant: options.variant || "default",
      action: options.action,
    }

    setToasts((toasts) => [...toasts, toast])

    if (options.duration) {
      setTimeout(() => {
        dismiss(id)
      }, options.duration)
    }

    return {
      id: id,
      dismiss: () => dismiss(id),
    }
  }, [])

  const dismiss = React.useCallback((id?: string) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id))
  }, [])

  const dismissAll = React.useCallback(() => {
    setToasts([])
  }, [])

  return {
    toast,
    dismiss,
    dismissAll,
  }
}

export { useToast }
