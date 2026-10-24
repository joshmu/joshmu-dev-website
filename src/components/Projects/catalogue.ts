export type Project = {
  title: string;
  type: string;
  description: string;
  stack: string[];
  website: string;
  github: string;
  img: { src: string; width: number; height: number };
  video: { src: string; width: number; height: number };
};

export const PROJECTS: readonly Project[] = [
  {
    title: "VideoNote",
    type: "Full Stack Web App",
    description: "A slick video review app, with the ability to share projects with guests.",
    stack: [
      "React",
      "NextJS",
      "Tailwind",
      "Serverless",
      "Nodejs",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Typescript",
    ],
    website: "https://videonote.app",
    github: "github.com/joshmu/videonote",
    img: {
      src: "https://assets.joshmu.dev/sites/joshmu-dev-website/images/videonote-hero.webp",
      width: 1600,
      height: 1074,
    },
    video: {
      src: "https://assets.joshmu.dev/sites/joshmu-dev-website/videos/videonote.mp4",
      width: 1199,
      height: 610,
    },
  },
  {
    title: "joshmu.com",
    type: "NextJS React Website",
    description: "The official website of professional dancer and yoga practitioner Josh Mu.",
    stack: ["React", "NextJS", "Nodejs", "Serverless", "Tailwind"],
    website: "https://joshmu.com",
    github: "github.com/joshmu/joshmu-dance-website",
    img: {
      src: "https://assets.joshmu.dev/sites/joshmu-dev-website/images/joshmu-hero.webp",
      width: 1600,
      height: 1081,
    },
    video: {
      src: "https://assets.joshmu.dev/sites/joshmu-dev-website/videos/joshmu-dance-website.mp4",
      width: 1200,
      height: 616,
    },
  },
  {
    title: "AID Online",
    type: "Full Stack Web App",
    description:
      " A web application which delivers auto generated choreographic scores in both text and audio for live performance outcomes and as a teaching tool.",
    stack: [
      "React",
      "Parcel",
      "Socket.io",
      "Nodejs",
      "Express",
      "Google TTS Api",
      "Heroku",
      "Tracery",
      "Compromise",
      "Tailwind",
    ],
    website: "http://aid.alisdairmacindoe.com",
    github: "github.com/joshmu/aid-online-code-sample",
    img: {
      src: "https://assets.joshmu.dev/sites/joshmu-dev-website/images/aidOnline-hero.webp",
      width: 1600,
      height: 1074,
    },
    video: {
      src: "https://assets.joshmu.dev/sites/joshmu-dev-website/videos/aid-online.mp4",
      width: 1200,
      height: 616,
    },
  },
];
