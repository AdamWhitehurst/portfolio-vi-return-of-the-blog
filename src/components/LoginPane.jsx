import { useAuth } from '@hooks'
import { Auth } from 'aws-amplify'
import React, { useState } from 'react'
import { ToastsStore } from 'react-toasts'
import { GroBtn, InputField } from './Inputs'
import { Label } from './Labels'
import { GrowPane, SpcBtwnRowBx } from './Layouts'

const loginWith = (email, password) => async () => {
  try {
    await Auth.signIn(email, password)

    ToastsStore.info('Login successful!')
  } catch (error) {
    ToastsStore.error(`Error logging in: ${error.code}`)
  }
}

const logout = async () => {
  try {
    await Auth.signOut()
    ToastsStore.info('Logged out.')
  } catch (error) {
    ToastsStore.error(`Log out error: ${error.message}`)
  }
}

export function LoginPane() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isAuth = useAuth()

  const open = () => setLoginOpen(true)
  const close = () => setLoginOpen(false)
  const login = loginWith(email, password)

  const renderLoginPane = (
    <>
      <Label htmlFor="email"> EMAIL </Label>
      <InputField
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label htmlFor="pwd"> PASSWORD </Label>
      <InputField
        id="pwd"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <SpcBtwnRowBx>
        {
            isAuth
              ? (<GroBtn onClick={logout}>LOG OUT</GroBtn>)
              : (<GroBtn onClick={login}>LOG IN</GroBtn>)
          }
        <GroBtn onClick={close}>CLOSE</GroBtn>
      </SpcBtwnRowBx>
    </>
  )

  const renderCollapsedButton = isAuth
    ? <GroBtn onClick={logout}>LOG OUT</GroBtn>
    : <GroBtn onClick={open}> OPEN LOGIN </GroBtn>

  return (
    <GrowPane expand={loginOpen}>
      {
      loginOpen
        ? (renderLoginPane)
        : (renderCollapsedButton)
      }
    </GrowPane>
  )
}
