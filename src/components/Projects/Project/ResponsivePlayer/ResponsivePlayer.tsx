import { isMobile } from "react-device-detect";

import ClientOnlyPlayer from "./ClientOnlyPlayer";
import { PlayIcon } from "./PlayIcon/PlayIcon";

type ResponsivePlayerProps = {
  video: { src: string; width: number; height: number };
  img: { src: string; width: number; height: number };
};

export const ResponsivePlayer = ({ video, img }: ResponsivePlayerProps) => {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
      <ClientOnlyPlayer
        wrapper="div"
        playing={true}
        src={video.src}
        style={{ position: "absolute", inset: 0 }}
        width="100%"
        height="100%"
        muted
        loop
        controls
        light={isMobile ? img.src : false}
        playIcon={<PlayIcon motionKey={img.src} />}
      />
    </div>
  );
};
