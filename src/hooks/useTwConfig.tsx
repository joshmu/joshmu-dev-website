import twConfigFile from 'tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const twConfig = resolveConfig(twConfigFile)

export const useTwConfig = () => twConfig
