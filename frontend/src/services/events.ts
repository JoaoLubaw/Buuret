class CustomEventTarget extends EventTarget {
  newRetEvent = new Event('newRet')
  popRetEvent = new Event('popRet')
}

export const customEventTarget = new CustomEventTarget()
