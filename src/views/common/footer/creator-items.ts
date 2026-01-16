import { github, instagram, kim, spotify, tobias, twitter } from '../../../assets';

interface CreatorLink {
  name: string;
  href: string;
  image: string;
}

interface Creator {
  name: string;
  image: string;
  links: CreatorLink[];
}

const creatorItems: Creator[] = [
  {
    name: 'KIM EGGLER',
    image: kim,
    links: [
      {
        name: 'GITHUB',
        href: 'https://github.com/kimeggler',
        image: github,
      },
      {
        name: 'INSTAGRAM',
        href: 'https://instagram.com/kim.eggler',
        image: instagram,
      },
      {
        name: 'TWITTER',
        href: 'https://twitter.com/kim_eggler',
        image: twitter,
      },
      {
        name: 'SPOTIFY',
        href: 'https://open.spotify.com/user/kim.eggler?si=ZbVUqNSdSrGYWQ0buNkw7Q',
        image: spotify,
      },
    ],
  },
  {
    name: 'TOBIAS BLASER',
    image: tobias,
    links: [
      {
        name: 'GITHUB',
        href: 'https://github.com/tobiasBlaser',
        image: github,
      },
      {
        name: 'INSTAGRAM',
        href: 'https://instagram.com/_tobi_bl_',
        image: instagram,
      },
      {
        name: 'SPOTIFY',
        href: 'https://open.spotify.com/user/toptob01?si=Tz-Iq0MjS9GXwiCQ_DkHNg',
        image: spotify,
      },
    ],
  },
];

export default creatorItems;
export type { Creator, CreatorLink };
