import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <div style={{ aspectRatio: '16/9', background: '#000' }} />,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClientOnlyPlayerProps = Record<string, any>

export default function ClientOnlyPlayer(props: ClientOnlyPlayerProps) {
  return <ReactPlayer {...props} />
}
