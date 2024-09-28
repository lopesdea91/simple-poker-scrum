import React from "react"
import { toast } from "sonner"
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const useToast = () => {
  const toastSuccess = (message: string) => {
    toast.success(message, {
      position: 'top-center',
      duration: 1750,
    })
  }
  const toastError = (error: unknown) => {
    toast.error(`Um Erro ocorreu, sorry!`, {
      position: 'top-center',
      duration: 2500,
      description: (error as Error).message,
      icon: <IconError />
    })
  }

  return {
    success: toastSuccess,
    error: toastError
  }
}

const IconError = () => {
  return <FontAwesomeIcon icon={faSkullCrossbones} />
}