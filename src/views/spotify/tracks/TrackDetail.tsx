import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getTrackDetail, TrackDetail as TrackDetailData } from '../../../helper/trackdetailhelper';
import { SpotifyTrack } from '../../../types/spotify';
import Footer from '../../common/footer/Footer';
import PageLoader from '../../common/loader/PageLoader';
import PaperNav from '../../common/papernav/PaperNav';

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const formatReleaseDate = (date: string, precision: string): string => {
  if (precision === 'year') return date;

  const parsed = new Date(precision === 'month' ? `${date}-01` : date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    ...(precision === 'day' ? { day: 'numeric' } : {}),
  });
};

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

const TrackDetail: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const location = useLocation();

  const [detail, setDetail] = useState<TrackDetailData | null | undefined>(undefined);

  useEffect(() => {
    if (!trackId) return;

    setDetail(undefined);
    const knownTrack = (location.state as { track?: SpotifyTrack } | null)?.track;

    getTrackDetail(trackId, knownTrack)
      .then(setDetail)
      .catch(err => {
        console.error(`Error loading track ${trackId}:`, err);
        setDetail(null);
      });
  }, [trackId, location.state]);

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      <div className="max-w-300 mx-auto px-6 md:px-10 pt-7">
        <Link
          to="/tracks"
          className="font-mono text-xs tracking-[0.06em] uppercase text-paper-muted hover:text-paper-fg"
        >
          ← All Tracks
        </Link>
      </div>

      {detail === undefined && <PageLoader label="Loading track…" />}

      {detail === null && (
        <div className="max-w-300 mx-auto px-6 md:px-10 py-16">
          <div className="font-mono text-xs text-paper-muted">
            Couldn't load this track right now.
          </div>
        </div>
      )}

      {detail && (
        <>
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-300 mx-auto px-6 md:px-10 pt-9 pb-[50px] grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-11 items-end"
          >
            <div
              className="w-full sm:w-55 aspect-square bg-paper-border bg-cover bg-center bg-no-repeat border border-paper-border shrink-0"
              style={
                detail.track.album.images[0]?.url
                  ? { backgroundImage: `url(${detail.track.album.images[0].url})` }
                  : undefined
              }
            />
            <div>
              <div className="flex items-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-4">
                <span className="w-2 h-2 bg-paper-accent inline-block" />
                Track
              </div>
              <h1 className="text-4xl sm:text-[52px] leading-none font-extrabold tracking-[-0.02em] mb-3.5">
                {detail.track.name}
              </h1>
              <div className="font-mono text-[13px] text-paper-muted mb-3.5">
                {detail.track.artists.map((artist, i) => (
                  <React.Fragment key={artist.id}>
                    {i > 0 && ', '}
                    <Link
                      to={`/artists/${artist.id}`}
                      state={{ artist }}
                      className="hover:text-paper-fg hover:underline"
                    >
                      {artist.name}
                    </Link>
                  </React.Fragment>
                ))}{' '}
                · {detail.track.album.name}
              </div>
              <div className="flex items-center gap-4 flex-wrap font-mono text-[13px] text-paper-muted">
                <span>{formatDuration(detail.track.duration_ms)}</span>
                <span className="border border-paper-accent text-paper-accent px-3 py-[5px] font-mono text-[11px] uppercase">
                  {detail.track.popularity}% popularity
                </span>
                {detail.track.explicit && (
                  <span className="border border-paper-border px-3 py-[5px] font-mono text-[11px] uppercase">
                    Explicit
                  </span>
                )}
                {detail.track.external_urls?.spotify && (
                  <a
                    href={detail.track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-paper-fg"
                  >
                    Open in Spotify ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* ON THE ALBUM */}
          <div className="border-t border-paper-border">
            <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
              <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                On The Album
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-paper-border">
                <div className="border-r border-b border-paper-border px-5 py-[26px]">
                  <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-muted mb-3">
                    Album Type
                  </div>
                  <div className="text-2xl font-extrabold tracking-[-0.01em]">
                    {capitalize(detail.track.album.album_type)}
                  </div>
                </div>
                <div className="border-r border-b border-paper-border px-5 py-[26px]">
                  <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-muted mb-3">
                    Released
                  </div>
                  <div className="text-2xl font-extrabold tracking-[-0.01em]">
                    {formatReleaseDate(
                      detail.track.album.release_date,
                      detail.track.album.release_date_precision,
                    )}
                  </div>
                </div>
                <div className="border-r border-b border-paper-border px-5 py-[26px]">
                  <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-muted mb-3">
                    Track
                  </div>
                  <div className="text-2xl font-extrabold tracking-[-0.01em]">
                    {detail.track.track_number} of {detail.track.album.total_tracks}
                  </div>
                </div>
                <div className="border-r border-b border-paper-border px-5 py-[26px]">
                  <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-muted mb-3">
                    Disc
                  </div>
                  <div className="text-2xl font-extrabold tracking-[-0.01em]">
                    {detail.track.disc_number}
                  </div>
                </div>
                <div className="border-r border-b border-paper-border px-5 py-[26px]">
                  <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-muted mb-3">
                    ISRC
                  </div>
                  <div className="text-2xl font-extrabold tracking-[-0.01em] truncate">
                    {detail.track.external_ids?.isrc || '—'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {detail.analysis ? (
            <>
              {/* MOOD CALLOUT */}
              <div className="border-t border-paper-border">
                <div className="max-w-300 mx-auto px-6 md:px-10 py-14 text-center">
                  <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-5">
                    Overall Mood
                  </div>
                  <div className="text-3xl sm:text-[44px] font-extrabold tracking-[-0.02em]">
                    <span className="font-serif italic font-normal text-paper-accent">
                      {detail.analysis.mood}
                    </span>
                  </div>
                  <div className="font-mono text-[13px] text-paper-muted mt-3.5">
                    Based on this track's valence, energy & danceability
                  </div>
                </div>
              </div>

              {/* SONIC PROFILE */}
              <div className="border-t border-paper-border">
                <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
                  <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                    Sonic Profile
                  </div>
                  <div className="flex flex-col gap-[22px]">
                    {detail.analysis.features.map(feature => (
                      <div
                        key={feature.name}
                        className="grid grid-cols-[110px_1fr_50px] sm:grid-cols-[160px_1fr_60px] items-center gap-5"
                      >
                        <div className="font-mono text-xs uppercase tracking-[0.05em] text-paper-muted truncate">
                          {feature.name}
                        </div>
                        <div className="h-3.5 bg-paper-border relative">
                          <div
                            className="absolute left-0 top-0 h-full"
                            style={{
                              width: `${feature.pct}%`,
                              background: feature.isDominant
                                ? 'var(--paper-accent)'
                                : 'var(--paper-fg)',
                            }}
                          />
                        </div>
                        <div className="font-mono text-[13px] text-paper-muted text-right">
                          {feature.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TRACK DATA */}
              <div className="border-t border-paper-border">
                <div className="max-w-300 mx-auto px-6 md:px-10 py-14 pb-24">
                  <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                    Track Data
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-paper-border">
                    {detail.analysis.specs.map(spec => (
                      <div
                        key={spec.label}
                        className="border-r border-b border-paper-border px-5 py-[26px]"
                      >
                        <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-muted mb-3">
                          {spec.label}
                        </div>
                        <div className="text-2xl font-extrabold tracking-[-0.01em]">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="border-t border-paper-border">
              <div className="max-w-300 mx-auto px-6 md:px-10 py-16 pb-24">
                <div className="font-mono text-xs text-paper-muted">
                  Detailed sonic data isn't available for this track.
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default TrackDetail;
