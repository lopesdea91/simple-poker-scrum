import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { where } from 'firebase/firestore';

import { useStore } from '@core/framework/hooks/useStore';
import { authStateWithGoogle } from "@core/framework/lib/firebase";
import { useAuth } from '@core/framework/hooks/useAuth';
import usersApi from '@core/infra/api/users';
import geteway from '@core/infra/gateway';
import userMemory from '@core/memory/localStorage/userMemory';
import { memoryLocal } from '@core/memory/memoryLocal';

export default function LayoutSetup() {
  const isMounted = useRef(false)
  const time1 = useRef<NodeJS.Timeout>()

  const { pathname } = useLocation()
  const store = useStore();
  const auth = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isMounted.current || store.auth.logged) return

    const sub = authStateWithGoogle(async (userGoogle) => {
      try {
        const isloggedOutWithGoogle = !userGoogle

        if (isloggedOutWithGoogle) {
          throw new Error('unauthenticated')
        }

        const dataLocal = userMemory(memoryLocal).get()

        if (!dataLocal) {
          throw new Error('unauthorized')
        }

        const resultUsers = await usersApi(geteway).query(
          where('uid', '==', dataLocal.uid)
        )

        const userData = resultUsers?.[0]

        if (!userData) {
          auth.signOut()
          throw new Error('unauthenticated')
        }

        store.setData({
          auth: { logged: true },
          user: userData!,
          initialApp: false,
          loading: false
        })

        // navigate(pathname === '/' ? '/rooms' : '/')

      } catch (error) {
        console.log('... authStateWithGoogle error', (error as Error).message);

        navigate('/')

        time1.current = setTimeout(() => {
          store.setData({
            initialApp: false,
            loading: false
          })
        }, 1000)
      }
    });

    return () => {
      if (!isMounted.current) return

      isMounted.current = true

      clearTimeout(time1.current)

      sub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
