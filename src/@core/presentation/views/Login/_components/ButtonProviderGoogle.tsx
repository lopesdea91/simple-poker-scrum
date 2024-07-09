import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import UserDto from '@core/dto/UserDto'
import { useStore } from '@core/framework/hooks/useStore'
import { signInWithGoogle } from '@core/framework/lib/firebase'
import usersApi from '@core/infra/api/users'
import geteway from '@core/infra/gateway'
import userMemory from '@core/memory/localStorage/userMemory'
import { memoryLocal } from '@core/memory/memoryLocal'

export default function ButtonProviderGoogle() {
  const time1 = useRef<NodeJS.Timeout>()
  const time2 = useRef<NodeJS.Timeout>()

  const navigate = useNavigate()

  const store = useStore()

  const handleClick = async () => {
    try {
      const { user: userGoogle } = await signInWithGoogle();

      // DTO DocumentData
      const userData = UserDto(userGoogle!)

      // create when not exist in api
      const exist = await usersApi(geteway).exist(userData.uid)
      if (!exist) {
        await usersApi(geteway).create({
          id: userData.id,
          uid: userData.uid,
          displayName: userData.displayName,
          photoURL: userData.photoURL
        })
      }

      userMemory(memoryLocal).create({
        uid: userData.uid,
        displayName: userData.displayName
      })

      time1.current = setTimeout(() => {
        store.setData({
          auth: { logged: true },
          user: userData,
          initialApp: false,
          loading: false
        })
      }, 0)

      time2.current = setTimeout(() => {
        navigate('/rooms')
      }, 0)
    } catch (error) {
      console.log('... handleClick error', error);
    }

    return () => {
      clearTimeout(time1.current)
      clearTimeout(time2.current)
    }
  }

  return (
    <>
      <button className='flex items-center gap-2 border-[1px] rounded-md px-4 py-2' onClick={handleClick}>
        <span>Entrar com</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className='w-4'>
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
        </svg>
      </button>
    </>
  )
}