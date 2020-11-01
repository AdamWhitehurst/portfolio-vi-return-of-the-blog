import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { ToastsStore } from 'react-toasts';
import styled from 'styled-components';
import { useAuth } from 'hook';
import { InputField, GroBtn } from './Inputs';
import { Label } from './Labels';
import { SpcBtwnRowBx } from './Layouts';

const GrowPane = styled.div`
    overflow: hidden;
    transition: height 0.25s;
    display: flex;
    flex-direction: column;
    height: ${({ expand }) => (expand ? '132px' : '30px')};
    ${({ expand }) => expand
    && `& button {
          padding-left: 0;
        }`}
`;

const loginWith = (email, password) => async () => {
  try {
    await Auth.signIn(email, password);

    ToastsStore.info('Login successful!');
  } catch (error) {
    ToastsStore.error(`Error logging in: ${error.code}`);
  }
};

const logout = async () => {
  try {
    await Auth.signOut();
    ToastsStore.info('Logged out.');
  } catch (error) {
    ToastsStore.error(`Log out error: ${error.message}`);
  }
};

export function LoginPane() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('1234567890');
  const isAuth = useAuth();

  const open = () => setLoginOpen(true);
  const close = () => setLoginOpen(false);
  const login = loginWith(email, password);

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
  );

  const renderCollapsedButton = isAuth
    ? <GroBtn onClick={logout}>LOG OUT</GroBtn>
    : <GroBtn onClick={open}> OPEN LOGIN </GroBtn>;

  return (
    <GrowPane expand={loginOpen}>
      {
      loginOpen
        ? (renderLoginPane)
        : (renderCollapsedButton)
      }
    </GrowPane>
  );
}
