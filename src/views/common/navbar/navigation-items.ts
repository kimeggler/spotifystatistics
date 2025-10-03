interface NavigationItem {
  path: string;
  label: string;
}

const navigationItems: NavigationItem[] = [
  {
    path: '/overview',
    label: 'Overview',
  },
  {
    path: '/artists',
    label: 'Artists',
  },
  {
    path: '/tracks',
    label: 'Tracks',
  },
  {
    path: '/analyze',
    label: 'Playlists',
  },
  {
    path: '/genres',
    label: 'Genres',
  },
  {
    path: '/feedback',
    label: 'Feedback',
  },
];

export default navigationItems;
export type { NavigationItem };
