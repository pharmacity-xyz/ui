const getLocalStorage = (key) => {
  try {
    let result = localStorage.getItem(key)
    if (!result) return null
    return JSON.parse(result)
  } catch (error: any) {
    console.error(`[getLocalStorage]: ${error.message}`)
  }
}

const setLocalStorage = (key, value) => {
  try {
    let stringifyValue = JSON.stringify(value)
    localStorage.setItem(key, stringifyValue)
  } catch (error: any) {
    console.error(`[setLocalStorage]: ${error.message}`)
  }
}

const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e: any) {
    console.error(`[removeLocalStorage]: ${e.message}`)
  }
}

export const LS = {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
}
