import { isMobile } from 'react-device-detect'
import ReactPlayer from 'react-player'

import { PlayIcon } from './PlayIcon/PlayIcon'

type ResponsivePlayerProps = {
  video: { src: string; width: number; height: number }
  img: { src: string; width: number; height: number }
}

export const ResponsivePlayer = ({ video, img }: ResponsivePlayerProps) => {
  return (
    <div
      // @ts-ignore
      style={{
        ...style.playerWrapper,
        paddingTop: calcVidRatio(img.width, img.height) + '%',
      }}
      className='w-full'
    >
      <ReactPlayer
        playing={true}
        url={video.src}
        style={style.reactPlayer}
        width='100%'
        height='100%'
        // width={video.width}
        // height={video.height}
        autoPlay
        muted
        loop
        controls
        light={isMobile ? img.src : false}
        playIcon={<PlayIcon motionKey={img.src} />}
      ></ReactPlayer>
    </div>
  )
}

const calcVidRatio = (width: number, height: number): number =>
  100 / (width / height)

const style = {
  playerWrapper: {
    position: 'relative',
    // Player ratio: 100 / (1280 / 720)
    // paddingTop: '56.25%',
    // the ratio is slightly out so we hide
    // overflow: 'hidden',
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}
