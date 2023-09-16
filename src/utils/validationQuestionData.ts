import { type ICheckboxProps, type IInputsProps } from '../interfaces'

export function validationQuestionData (questionData: IInputsProps, checkboxSelections: ICheckboxProps, questionTime: number) {
  let isValid = true
  let emptyFieldsCount = 0
  let message = 'Pregunta agregada correctamente'

  if (questionData.question === '') {
    isValid = false
    emptyFieldsCount++
    message = 'No debes dejar la pregunta en blanco'
  }

  if (questionTime === 0) {
    isValid = false
    message = 'El tiempo para la pregunta debe ser mayor a cero'
  }

  if (questionData.answer1 === '' || questionData.answer2 === '' || questionData.answer3 === '' || questionData.answer4 === '') {
    isValid = false
    emptyFieldsCount++
    message = 'Tienes que llenar todos los campos de las posibles respuestas'
  }

  if (!checkboxSelections.answer1 && !checkboxSelections.answer2 && !checkboxSelections.answer3 && !checkboxSelections.answer4) {
    isValid = false
    emptyFieldsCount++
    message = 'Debes seleccionar las respuesta correcta para la pregunta'
  }

  return {
    isValid,
    message,
    isAllEmpty: emptyFieldsCount === 3
  }
}
