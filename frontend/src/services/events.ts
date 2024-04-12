class CustomEventTarget extends EventTarget {
  newRetEvent = new Event('newRet')
  popRetEvent = new Event('popRet')
  updateBuserEvent = new Event('updateBuser')
}

export const customEventTarget = new CustomEventTarget()
