import { usePersistentState } from '@hooks'
import { toSlugCase } from '@utils'
import React, { useState } from 'react'
import { GroBtn, InputField } from './Inputs'
import { Label } from './Labels'
import { GrowPane, SpcBtwnRowBx } from './Layouts'

const defaultColors = {
  accent: '#DAA52088',
  base: '#242424',
  textDefault: '#ffffff',
}

export function PrefsPane() {
  const [colors, setColors] = usePersistentState('themeColors', defaultColors)
  const [prefsOpen, setPrefsOpen] = useState(false)

  React.useEffect(() => {
    Object
      .keys(colors)
      .forEach(
        (c) => document
          .documentElement
          .style
          .setProperty(
            `--${toSlugCase(c)}`,
            colors[c],
          ),
      )
  }, [colors])

  const onApply = (c) => setColors(c)
  const onClose = () => setPrefsOpen(false)
  const open = () => setPrefsOpen(true)

  const prefsProps = {
    colors,
    onApply,
    onClose,
  }

  const growPaneProps = {
    height: '232px',
    expand: prefsOpen,
  }

  const groBtnProps = {
    ariaLabel: 'Open Prefs',
    id: 'openPrefs',
    onClick: open,
  }

  return (
    <GrowPane {...growPaneProps}>
      {
      prefsOpen
        ? (<Prefs {...prefsProps} />)
        : (<GroBtn {...groBtnProps}> OPEN PREFS </GroBtn>)
      }
    </GrowPane>
  )
}

function Prefs(props) {
  const { colors: savedColors, onApply, onClose: close } = props
  const [colors, setColors] = useState(savedColors)

  const apply = () => {
    onApply(colors)
  }
  const setColorsFor = (key) => (e) => setColors({ ...colors, [key]: e.target.value })

  const baseInputProps = {
    id: 'base',
    value: colors.base,
    onChange: setColorsFor('base'),
  }

  const accentInputProps = {
    id: 'accent',
    value: colors.accent,
    onChange: setColorsFor('accent'),
  }

  const textDefaultInputProps = {
    id: 'textDefault',
    value: colors.textDefault,
    onChange: setColorsFor('textDefault'),
  }

  const applyBtnProps = {
    ariaLabel: 'Apply Prefs',
    id: 'applyPrefs',
    onClick: apply,
  }

  const closeBtnProps = {
    ariaLabel: 'Close Prefs',
    id: 'closePrefs',
    onClick: close,
  }

  return (
    <>
      <Label htmlFor="base"> BASE COLOR </Label>
      <InputField {...baseInputProps} />
      <Label htmlFor="accent"> ACCENT COLOR </Label>
      <InputField {...accentInputProps} />
      <Label htmlFor="textDefault"> TEXT COLOR </Label>
      <InputField {...textDefaultInputProps} />
      <SpcBtwnRowBx>
        <GroBtn {...applyBtnProps}>APPLY</GroBtn>
        <GroBtn {...closeBtnProps}>CLOSE</GroBtn>
      </SpcBtwnRowBx>
    </>
  )
}
