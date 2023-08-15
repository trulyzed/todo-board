export const appendClass = (existingClass: string='', newClasses: string[]=[]) => {
  const formattedNewClasses = newClasses.join(' ')
  return formattedNewClasses ? `${existingClass ? `${existingClass} ` : ''}${formattedNewClasses}` : existingClass
}