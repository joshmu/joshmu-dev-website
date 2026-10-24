import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useInView } from "react-intersection-observer";

import ClientOnlyPlayer from "./ClientOnlyPlayer";
import { PlayIcon } from "./PlayIcon/PlayIcon";

type ResponsivePlayerProps = {
  video: { src: string; width: number; height: number };
  img: { src: string; width: number; height: number };
};

export const ResponsivePlayer = ({ video, img }: ResponsivePlayerProps) => {
  const [ref, inView] = useInView({ threshold: 0.25 });
  // Mount on first view so off-screen videos never download, then keep it mounted to resume.
  const [hasEnteredView, setHasEnteredView] = useState(false);
  if (inView && !hasEnteredView) setHasEnteredView(true);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ aspectRatio: `${img.width} / ${img.height}` }}
    >
      {hasEnteredView ? (
        <ClientOnlyPlayer
          wrapper="div"
          playing={inView}
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
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "#000" }} />
      )}
    </div>
  );
};
