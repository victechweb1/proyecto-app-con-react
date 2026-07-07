// aca combino clases de tailwind para usarlas en los componentes
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
