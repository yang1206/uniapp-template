import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

export const VinUIResolver = (): ComponentResolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Vin')) {
        const cName = name.slice(3).toLowerCase()
        return {
          name,
          from: `@vingogo/uni-ui/components/${cName}/index.vue`,
        }
      }
    },
  }
}

export const UniNutUiResolver = (): ComponentResolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Nut[A-Z]|nut-[a-z])/)) {
        const cName = name.slice(3).toLowerCase()
        return {
          from: `uni-nutui/components/sky-nutui/packages/__VUE/${cName}/index.vue`,
        }
      }
    },
  }
}
