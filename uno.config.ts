import {
  type PresetOrFactory,
  type UserConfig,
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { isH5, isMp } from '@uni-helper/uni-env'
import { presetUni } from '@uni-helper/unocss-preset-uni'

const darkMode = isH5 ? 'class' : 'media'

const config: UserConfig = defineConfig({
  content: {
    pipeline: {
      exclude: [
        'node_modules',
        '.git',
        '.github',
        '.husky',
        '.vscode',
        'build',
        'dist',
        'mock',
        'public',
        'types',
        './stats.html',
      ],
    },
  },
  shortcuts: [
    ['btn', 'w-60 h-60 flex items-center justify-center rounded-full bg-teal-600 text-white cursor-pointer'],
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['absolute-lt', 'absolute left-0 top-0'],
    ['absolute-lb', 'absolute left-0 bottom-0'],
    ['absolute-rt', 'absolute right-0 top-0'],
    ['absolute-rb', 'absolute right-0 bottom-0'],
    ['absolute-center', 'absolute-lt f-c-c wh-full'],
    ['text-ellipsis', 'truncate'],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],
  ],
  presets: [
    presetUni({
      uno: {
        dark: darkMode,
        variablePrefix: 'li-',
      },
      attributify: {
        ignoreAttributes: ['block', 'fixed'],
      },
      remRpx: {
        baseFontSize: 2,
        mode: isMp ? 'rem2rpx' : 'rpx2rem',
      },
    }) as PresetOrFactory,
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // 保持h5和微信小程序转换比例一致
    presetRemToPx({ baseFontSize: 2 }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  theme: {
    preflightRoot: isMp ? ['page,::before,::after'] : undefined,
  },
})

export default config
