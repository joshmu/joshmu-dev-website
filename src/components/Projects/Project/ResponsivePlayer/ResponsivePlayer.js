import ReactPlayer from 'react-player'

import PlayIcon from './PlayIcon/PlayIcon'

const ResponsivePlayer = ({ video, img }) => {
  return (
    <div
      style={{
        ...style.playerWrapper,
        paddingTop: calcVidRatio(img.width, img.height) + '%',
      }}
    >
      <ReactPlayer
        style={style.reactPlayer}
        url={video.src}
        width='100%'
        hegiht='100%'
        // width={video.width}
        // height={video.height}
        autoPlay
        muted
        loop
        controls
        light={img.src}
        playIcon={<PlayIcon />}
      ></ReactPlayer>
    </div>
  )
}

const calcVidRatio = (width, height) => 100 / (width / height)

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

export default ResponsivePlayer
