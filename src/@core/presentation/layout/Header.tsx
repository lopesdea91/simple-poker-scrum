import React, { FC, ReactNode, useRef, useState } from 'react'
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'

import { signInWithGoogle, signOutWithGoogle } from 'src/@core/framework/lib/firebase'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { geteway } from 'src/@core/infra/gateway'
import { useMemory } from 'src/@core/infra/memory'
import { memoryLocal } from 'src/@core/infra/memory/memoryLocal'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from 'src/@core/presentation/ui/AlertDialog'
import { Input, InputControl } from 'src/@core/presentation/ui/Input'
import { Button } from 'src/@core/presentation/ui/Button'
import { Label } from 'src/@core/presentation/ui/Label'
import { SheetsProfile } from 'src/@core/presentation/Sheets'
import { GetUserByUIDService } from 'src/@core/services/GetUserByUIDService'
import { CreateUserService } from 'src/@core/services/CreateUserService'
import { MakeUserOnlineService } from 'src/@core/services/MakeUserOnlineService'
import { MakeUserOfflineService } from 'src/@core/services/MakeUserOfflineService'
import { DeleteUserService } from 'src/@core/services/DeleteUserService'
import { UserProviderParseData } from 'src/@core/utils/userProviderParseData'

export const Header = () => {
  const appStore = useAppStore()

  return (
    <Root>
      <Wrapper>
        <Brand />

        {appStore.auth?.id
          ? <ContentAuthenticated />
          : <ContentUnauthenticated />}
      </Wrapper>
    </Root>
  )
}

const Root: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className='mb-3 md:mb-5 mx-3'>
      {children}
    </header>
  )
}
const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='p-2 mx-auto w-full max-w-screen-md border-b-[1px] shadow-sm flex items-center justify-between'>
      {children}
    </div>
  )
}
const Brand: FC = () => {
  const appStore = useAppStore()

  return (
    <button
      className='text-xs text-sky-900 font-bold m-0 p-0 leading-0 hover:opacity-75'
      onClick={() => appStore.setView('principal')}
    >
      SIMPLE-POKER
    </button>
  )
}
const ContentAuthenticated: FC = () => {
  return (
    <div
      data-animate="animate-content"
      className='flex items-center gap-1 text-xs'
    >
      <span className=''>Olá</span>
      <ButtonProfile />
      <span className='h-8 border-r mx-1'></span>
      <ButtonSignOut />
    </div>
  )
}
const ButtonProfile: FC = () => {
  const appStore = useAppStore()
  const memory = useMemory(memoryLocal)

  const sheetRef = useRef<{ open: () => void, close: () => void }>(null)

  const handleDeleteSuccess = async () => {
    sheetRef.current?.close()
  }

  return (
    <SheetsProfile ref={sheetRef}>
      <InputControl>
        <Label htmlFor='uid'>uid</Label>
        <Input id='uid' disabled defaultValue={appStore.auth?.uid} />
      </InputControl>

      <InputControl>
        <Label htmlFor='displayName'>displayName</Label>
        <Input id='displayName' disabled defaultValue={appStore.auth?.displayName} />
      </InputControl>

      <InputControl>
        <Label htmlFor='online'>online</Label>
        <Input id='online' disabled defaultValue={JSON.stringify(appStore.auth?.online)} />
      </InputControl>

      <InputControl>
        <Label htmlFor='updated_at' className='flex items-center gap-2'>
          updated_at
          <span className='text-xs text-gray-400'>{dayjs(appStore.auth?.updated_at).format('DD/MM/YYYY')}</span>
        </Label>
        <Input id='updated_at' disabled defaultValue={appStore.auth?.updated_at} />
      </InputControl>

      <div className="flex justify-end p-2">
        <ButtonDeleteAccount handleDeleteSuccess={handleDeleteSuccess} />
      </div>
    </SheetsProfile>
  )
}

const ButtonDeleteAccount: FC<{
  handleDeleteSuccess: () => void
}> = ({ handleDeleteSuccess }) => {
  const appStore = useAppStore()
  const memory = useMemory(memoryLocal)

  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
    handleDeleteSuccess()
  }

  const handleDelete = async () => {
    try {
      appStore.setDisabled(true)

      await DeleteUserService(geteway)(appStore.auth)

      memory.delete()

      appStore.setAuth(null)

      await signOutWithGoogle()

      close()

    } catch (error) {
      console.log(error);
    } finally {
      appStore.setDisabled(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button type='button' variant='ghost'>Excluir conta</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Excluir conta:
          </AlertDialogTitle>

          <AlertDialogDescription className='text-sm'>
            Ao excluir sua conta não será possivel recuperar os dados atuais, será necessário recriar as salas novamente, desejar continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={appStore.disabled}>
            Cancelar
          </AlertDialogCancel>

          <Button
            type='button'
            onClick={handleDelete}
            disabled={appStore.disabled}
          >
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


const ButtonSignOut: FC = () => {
  const appStore = useAppStore()
  const memory = useMemory(memoryLocal)

  const handleSignOut = async () => {
    try {
      await signOutWithGoogle()

      await MakeUserOfflineService(geteway)(appStore.auth!.uid)

      memory.delete()

      appStore.setAuth(null)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className='flex items-center gap-1.5 h-6 text-lg text-gray-600 hover:opacity-75 duration-150'
      disabled={appStore.loading}
      title='Sair'
    >
      <span className='text-sm'>Sair</span>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )
}
const ContentUnauthenticated: FC = () => {
  const appStore = useAppStore()
  const memory = useMemory(memoryLocal)

  const handleSignIn = async () => {
    try {
      const { user: userGoogle } = await signInWithGoogle();

      const userProviderData = UserProviderParseData(userGoogle)

      let currentUser = await GetUserByUIDService(geteway)(userProviderData.uid)

      if (!!currentUser) {
        await MakeUserOnlineService(geteway)(currentUser.uid)
      }

      if (!currentUser) {
        currentUser = await CreateUserService(geteway)(userProviderData!)
      }

      memory.create(currentUser!)

      appStore.setAuth(currentUser!)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      data-animate="animate-content"
      onClick={handleSignIn}
      className='flex items-center gap-1.5 h-6 text-lg text-gray-600 hover:opacity-75 duration-150'
      disabled={appStore.loading}
      title='Entrar'
    >
      <span className='text-sm'>Entrar</span>
      <FontAwesomeIcon icon={faRightToBracket} />
    </button>
  )
}