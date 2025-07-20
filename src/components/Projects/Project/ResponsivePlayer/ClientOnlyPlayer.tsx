import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <div style={{ aspectRatio: '16/9', background: '#000' }} />
})

export type ClientOnlyPlayerProps = ComponentProps<typeof ReactPlayer>

export default function ClientOnlyPlayer(props: ClientOnlyPlayerProps) {
  return <ReactPlayer {...props} />
}