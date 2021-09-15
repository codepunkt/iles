import { defineAsyncComponent } from 'vue'

const layouts = import.meta.glob('__LAYOUTS_ROOT__/**/*.vue')

export function getLayout (name: string | false | undefined) {
  if (name === false) return false
  if (!name) name = 'default'

  const layout = layouts[`__LAYOUTS_ROOT__/${name}.vue`]
  if (layout) {
    const component = defineAsyncComponent(layout)
    component.name = `${name}Layout`
    return component
  }

  // If no default layout is defined, render the page by itself.
  if (name === 'default')
    return (props: any, { slots }: any) => slots.default && slots.default()

  throw new Error(`Unknown layout '${name}'. Should be defined in __LAYOUTS_ROOT__/${name}.vue`)
}
