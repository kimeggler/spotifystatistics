interface Breakpoint {
  name: string;
  breakpoint: string;
}

interface BreakpointsConfig {
  breakpoints: Breakpoint[];
  default: string;
}

const breakpointsConfig: BreakpointsConfig = {
  breakpoints: [
    {
      name: 'smallAndBelow',
      breakpoint: '(max-width: 599px)',
    },
    {
      name: 'smallAndAbove',
      breakpoint: '(min-width: 600px)',
    },
    {
      name: '600AndBelow',
      breakpoint: '(max-width: 599px)',
    },
    {
      name: '600AndAbove',
      breakpoint: '(min-width: 600px)',
    },
    {
      name: '700AndBelow',
      breakpoint: '(max-width: 699px)',
    },
    {
      name: '700AndAbove',
      breakpoint: '(min-width: 700px)',
    },
    {
      name: '800AndBelow',
      breakpoint: '(max-width: 799px)',
    },
    {
      name: '800AndAbove',
      breakpoint: '(min-width: 800px)',
    },
    {
      name: '900AndBelow',
      breakpoint: '(max-width: 899px)',
    },
    {
      name: '900AndAbove',
      breakpoint: '(min-width: 900px)',
    },
    {
      name: '1000AndBelow',
      breakpoint: '(max-width: 999px)',
    },
    {
      name: '1000AndAbove',
      breakpoint: '(min-width: 1000px)',
    },
    {
      name: 'mobileAndBelow',
      breakpoint: '(max-width: 899px)',
    },
    {
      name: 'desktopAndAbove',
      breakpoint: '(min-width: 900px)',
    },
    {
      name: '1200AndBelow',
      breakpoint: '(max-width: 1199px)',
    },
    {
      name: '1200AndAbove',
      breakpoint: '(min-width: 1200px)',
    },
    {
      name: 'largeAndBelow',
      breakpoint: '(max-width: 1399px)',
    },
    {
      name: 'largeAndAbove',
      breakpoint: '(min-width: 1400px)',
    },
  ],
  default: 'desktopAndAbove',
};

export default breakpointsConfig;
export type { Breakpoint, BreakpointsConfig };