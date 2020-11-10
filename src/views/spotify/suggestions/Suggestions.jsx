import React from 'react';
// import { fetchSuggestions } from '../../../services/spotifyservice';
// import { Suggestion, DefaultErrorMessage } from '../../common';
import './style.css';

// import { Spinner } from '../../common';
// import useDataHook from '../../../hooks/useDataHook';

function Suggestions() {
  // const [baseContent, setBaseContent] = '';
  // const [suggestionsRequest, setSuggestionsRequest] = useState(() => () => fetchSuggestions(baseContent));
  // const { data: artists, isLoading, hasError } = useDataHook(suggestionsRequest);

  // useEffect(() => {
  //   setSuggestionsRequest(() => () => fetchSuggestions(baseContent));
  // }, [timerange]);

  // if (hasError) return <DefaultErrorMessage />;
  // if (!artists > 0 && isLoading !== false) return <Spinner />;

  // const renderSuggestions = () => {
  //   return artists.map((artist, index) => {
  //     return Suggestion(artist, index);
  //   });
  // };

  return (
    <div className="suggestions">
      <h1 className="site-title">Let us show you songs you might like!</h1>

      {/* <div className="suggestions-content">{renderSuggestions()}</div> */}
    </div>
  );
}

export default Suggestions;
