export const appendClass = (existingClass='', newClasses: string[]=[]) => {
  const formattedNewClasses = newClasses.join(' ')
  return formattedNewClasses ? `${existingClass ? `${existingClass} ` : ''}${formattedNewClasses}` : existingClass
}