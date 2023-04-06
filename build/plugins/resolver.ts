import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

export function UniNutUiResolver(): ComponentResolver {
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

export function TmUiResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Tm[A-Z]|tm-[a-z])/)) {
        const cName = name.slice(2).replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase()
        return {
          name,
          from: `@/tmui/components/tm-${cName}/tm-${cName}.vue`,
        }
      }
    },
  }
}

export function UviewUiResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(U[-A-Z]|u-[-a-z])/)) {
        const cName = name.slice(1).match(/([A-Z])([a-z]+)/g)?.map(m => m.toLowerCase()).toString().replace(',', '-')
        return {
          from: `uview-plus/components/u-${cName}/u-${cName}.vue`,
        }
      }
    },
  }
}
