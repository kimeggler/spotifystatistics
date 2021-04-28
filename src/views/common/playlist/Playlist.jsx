import React, { Fragment } from 'react';

import { close } from '../../../assets';
import './style.css';

function Playlist(playlist, activePlaylist, changePlaylist, analyse, closePlaylist) {
  let background = {};
  // let chartoptions = {
  //   tooltip: {
  //     theme: 'dark',
  //   },
  //   chart: {
  //     height: 200,
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   noData: {
  //     text: 'Loading...',
  //     align: 'center',
  //     verticalAlign: 'middle',
  //   },
  //   stroke: {
  //     curve: 'smooth',
  //   },
  //   plotOptions: {
  //     radar: {
  //       size: 150,
  //       offsetX: 0,
  //       offsetY: 0,
  //       polygons: {
  //         strokeColors: '#FFFFFF',
  //         strokeWidth: 2,
  //         connectorColors: '#FFFFFF',
  //         fill: {
  //           colors: ['#FFFFFF00'],
  //         },
  //       },
  //     },
  //   },
  //   yaxis: {
  //     show: false,
  //     labels: {
  //       rotate: -90,
  //       rotateAlways: true,
  //       style: {
  //         fontSize: '14px',
  //         colors: '#FFFFFF',
  //       },
  //     },
  //   },
  //   xaxis: {
  //     labels: {
  //       show: true,
  //       style: {
  //         fontSize: '14px',
  //         colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
  //       },
  //     },
  //     categories: [
  //       'Acousticness',
  //       'Danceability',
  //       'Energy',
  //       'Instrumentalness',
  //       'Liveness',
  //       'Speechiness',
  //       'Happiness',
  //     ],
  //   },
  // };

  if (playlist.images[0]) {
    background = {
      backgroundImage: `url(${playlist.images[0].url})`,
    };
  }

  // const returnSeries = () => {
  //   console.log(analyse);
  //   if (analyse.length === 0) {
  //     return null;
  //   }
  //   return [
  //     {
  //       name: playlist.name,
  //       data: analyse,
  //     },
  //   ];
  // };

  const renderAnalysis = name => {
    return (
      <div className="playlist-overlay">
        <div className="analyse-info">
          <div className="analyse-title-box">
            <p className="analyse-title">About your Playlist</p>
            <p className="analyse-name">{name}</p>
          </div>
          {/* <p>
            The content of the playlist is analyzed by Spotify based on a couple of categories. The
            assessment includes the calculation of the proportion of vocal and instrumental parts of
            songs. Furthermore the average energy of each song is being calculated. Additionally
            Spotify gives insights into how euphoric or dystrophic the songs in your playlist are.
          </p> */}
        </div>
        <div className="chart-area">
          {analyse.length > 0 && (
            <div className="analyse-chart">
              {analyse?.map(serie => {
                return (
                  <div className="analyse-serie" key={serie.name}>
                    <p>{serie.name}</p>
                    <div className="analyse-chart-box">
                      <div className="analyse-chart-background"></div>
                      <div
                        style={{ width: `${serie.value}%` }}
                        className="analyse-chart-foreground"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* <div className="analyse-chart">
          {returnSeries().length === 0 && <ComponentSpinner />}
          {returnSeries().length > 0 && (
            <ReactApexChart
              options={chartoptions}
              series={returnSeries()}
              height="400px"
              width="500px"
              type="radar"
            />
          )}
        </div> */}
      </div>
    );
  };

  const renderOverlay = name => {
    return (
      <div className="playlist-analyse">
        {renderAnalysis(name)}
        <img src={close} alt="close" onClick={() => closePlaylist()} className="close-analyse" />
      </div>
    );
  };

  return (
    <div className="playlist-container" key={playlist.id}>
      <div className="playlist">
        <div
          className="img-container"
          onClick={async () => {
            changePlaylist(playlist.id);
          }}
        >
          {/* <img alt={artist.name} src={artist.images[0].url} className='artist-card-image' /> */}
          <div style={background} className="playlist-card-image"></div>
          <p className="playlist-rank">Analyze</p>
        </div>
        <p className="playlist-card-name bold">{playlist.name}</p>
      </div>
      <Fragment>{activePlaylist === playlist.id ? renderOverlay(playlist.name) : null}</Fragment>
    </div>
  );
}

export default Playlist;
