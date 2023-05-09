type StringObject = Record<string, string>

export const allValuesNotEmpty = (values: StringObject) => {
  for (const key in values) {
    if (values[key] === '') {
      console.log('asd')
      return false
    }
  }
  return true
}
