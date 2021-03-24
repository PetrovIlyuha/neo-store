import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

const MediaQueries = () => {
   let isSmallScreen = useMediaQuery('(max-width: 500px)')
   let isMediumScreen = useMediaQuery('(max-width: 770px)')
    return {
      isSmallScreen,
      isMediumScreen
    }
}

export default MediaQueries
