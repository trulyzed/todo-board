export const appendNewClasses = (existingClass: string='', newClasses: string[]=[]) => {
  const formattedNewClasses = newClasses.join(' ')
  return formattedNewClasses ? `${existingClass ? `${existingClass} ` : ''}${formattedNewClasses}` : existingClass
}