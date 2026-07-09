import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArtistDetail as ArtistDetailData, getArtistDetail } from '../../../helper/artistdetailhelper';
import { SpotifyArtist } from '../../../types/spotify';
import Footer from '../../common/footer/Footer';
import PageLoader from '../../common/loader/PageLoader';
import PaperNav from '../../common/papernav/PaperNav';

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const formatFollowers = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return `${count}`;
};

const releaseYear = (releaseDate: string): string => releaseDate.slice(0, 4) || '—';

const ArtistDetail: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const location = useLocation();

  const [detail, setDetail] = useState<ArtistDetailData | null | undefined>(undefined);

  useEffect(() => {
    if (!artistId) return;

    setDetail(undefined);
    const knownArtist = (location.state as { artist?: SpotifyArtist } | null)?.artist;

    getArtistDetail(artistId, knownArtist)
      .then(setDetail)
      .catch(err => {
        console.error(`Error loading artist ${artistId}:`, err);
        setDetail(null);
      });
  }, [artistId, location.state]);

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      <div className="max-w-300 mx-auto px-6 md:px-10 pt-7">
        <Link
          to="/artists"
          className="font-mono text-xs tracking-[0.06em] uppercase text-paper-muted hover:text-paper-fg"
        >
          ← All Artists
        </Link>
      </div>

      {detail === undefined && <PageLoader label="Loading artist…" />}

      {detail === null && (
        <div className="max-w-300 mx-auto px-6 md:px-10 py-16">
          <div className="font-mono text-xs text-paper-muted">
            Couldn't load this artist right now.
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
              className="w-full sm:w-55 aspect-square bg-paper-border bg-cover bg-center border border-paper-border shrink-0"
              style={
                detail.artist.images[0]?.url
                  ? { backgroundImage: `url(${detail.artist.images[0].url})` }
                  : undefined
              }
            />
            <div>
              <div className="flex items-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-4">
                <span className="w-2 h-2 bg-paper-accent inline-block" />
                Artist
              </div>
              <h1 className="text-4xl sm:text-[52px] leading-none font-extrabold tracking-[-0.02em] mb-3.5">
                {detail.artist.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap font-mono text-[13px] text-paper-muted mb-3.5">
                <span>{formatFollowers(detail.artist.followers.total)} followers</span>
                <span className="border border-paper-accent text-paper-accent px-3 py-[5px] font-mono text-[11px] uppercase">
                  {detail.artist.popularity}% popularity
                </span>
                {detail.artist.external_urls?.spotify && (
                  <a
                    href={detail.artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-paper-fg"
                  >
                    Open in Spotify ↗
                  </a>
                )}
              </div>
              {detail.artist.genres.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {detail.artist.genres.slice(0, 5).map(genre => (
                    <span
                      key={genre}
                      className="font-mono text-[11px] tracking-[0.04em] uppercase border border-paper-border px-3 py-[5px] text-paper-muted"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* TOP TRACKS */}
          {detail.topTracks.length > 0 && (
            <div className="border-t border-paper-border">
              <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
                <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                  Top Tracks
                </div>
                <div className="flex flex-col">
                  {detail.topTracks.slice(0, 10).map((track, i) => (
                    <div
                      key={track.id}
                      className="grid grid-cols-[30px_1fr_auto] sm:grid-cols-[40px_60px_1fr_auto] items-center gap-4 sm:gap-5 py-4 border-b border-paper-border"
                    >
                      <div className="font-mono text-[13px] text-paper-muted">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div
                        className="hidden sm:block w-10 h-10 bg-paper-border bg-cover bg-center shrink-0"
                        style={
                          track.album.images[0]?.url
                            ? { backgroundImage: `url(${track.album.images[0].url})` }
                            : undefined
                        }
                      />
                      <div className="min-w-0">
                        <div className="text-[15px] font-bold truncate">{track.name}</div>
                        <div className="font-mono text-[11px] text-paper-muted truncate">
                          {track.album.name}
                        </div>
                      </div>
                      <div className="font-mono text-[11px] text-paper-muted whitespace-nowrap">
                        {formatDuration(track.duration_ms)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DISCOGRAPHY */}
          {detail.albums.length > 0 && (
            <div className="border-t border-paper-border">
              <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
                <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                  Discography
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-paper-border">
                  {detail.albums.map(album => (
                    <div
                      key={album.id}
                      className="border-r border-b border-paper-border p-5 flex flex-col gap-[14px]"
                    >
                      <div
                        className="w-full aspect-square bg-paper-border bg-cover bg-center"
                        style={
                          album.images[0]?.url
                            ? { backgroundImage: `url(${album.images[0].url})` }
                            : undefined
                        }
                      />
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.04em] uppercase text-paper-accent mb-1.5">
                          {album.album_group || album.album_type} · {releaseYear(album.release_date)}
                        </div>
                        <div className="text-[15px] font-bold truncate">{album.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FREQUENT COLLABORATORS */}
          {detail.collaborators.length > 0 && (
            <div className="border-t border-paper-border">
              <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
                <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                  Frequent Collaborators
                </div>
                <div className="flex flex-wrap gap-4">
                  {detail.collaborators.map(collaborator => (
                    <Link
                      key={collaborator.id}
                      to={`/artists/${collaborator.id}`}
                      state={{ artist: collaborator }}
                      className="flex items-center gap-3 border border-paper-border px-3 py-2 hover:border-paper-fg transition-colors"
                    >
                      <div
                        className="w-9 h-9 bg-paper-border bg-cover bg-center shrink-0"
                        style={
                          collaborator.images[0]?.url
                            ? { backgroundImage: `url(${collaborator.images[0].url})` }
                            : undefined
                        }
                      />
                      <div className="text-sm font-bold whitespace-nowrap">{collaborator.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RELATED ARTISTS */}
          {detail.relatedArtists.length > 0 && (
            <div className="border-t border-paper-border">
              <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
                <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                  Related Artists
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-paper-border">
                  {detail.relatedArtists.slice(0, 8).map(related => (
                    <Link
                      key={related.id}
                      to={`/artists/${related.id}`}
                      state={{ artist: related }}
                      className="border-r border-b border-paper-border p-5 flex flex-col gap-[14px] hover:bg-paper-border/20 transition-colors"
                    >
                      <div
                        className="w-full aspect-square bg-paper-border bg-cover bg-center"
                        style={
                          related.images[0]?.url
                            ? { backgroundImage: `url(${related.images[0].url})` }
                            : undefined
                        }
                      />
                      <div>
                        <div className="text-[17px] font-extrabold mb-2">{related.name}</div>
                        <div className="font-mono text-xs text-paper-muted">
                          {formatFollowers(related.followers.total)} followers
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pb-10" />
        </>
      )}

      <Footer />
    </div>
  );
};

export default ArtistDetail;
