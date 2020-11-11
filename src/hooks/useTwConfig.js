import twConfigFile from 'tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const twConfig = resolveConfig(twConfigFile)

const useTwConfig = () => twConfig

export default useTwConfig
