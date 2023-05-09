
export function generateCode () {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  let code = ''
  const codeArr = []

  // Agregamos 3 letras aleatorias
  for (let i = 0; i < 3; i++) {
    codeArr.push(letters.charAt(Math.floor(Math.random() * letters.length)))
  }

  // Agregamos 3 números aleatorios
  for (let i = 0; i < 3; i++) {
    codeArr.push(numbers.charAt(Math.floor(Math.random() * numbers.length)))
  }

  // Mezclamos aleatoriamente los caracteres
  while (codeArr.length > 0) {
    const randomIndex = Math.floor(Math.random() * codeArr.length)
    code += codeArr.splice(randomIndex, 1)[0]
  }

  return code
}
