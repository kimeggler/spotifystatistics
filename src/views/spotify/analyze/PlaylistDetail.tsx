import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPlaylistAnalysis, PlaylistAnalysis } from '../../../helper/playlistanalysishelper';
import { getData } from '../../../services/fetchservice';
import { SpotifyPlaylist } from '../../../types/spotify';
import Footer from '../../common/footer/Footer';
import PaperNav from '../../common/papernav/PaperNav';

const PlaylistDetail: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const location = useLocation();

  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(
    (location.state as { playlist?: SpotifyPlaylist } | null)?.playlist ?? null,
  );
  const [analysis, setAnalysis] = useState<PlaylistAnalysis | null | undefined>(undefined);

  useEffect(() => {
    if (playlist || !playlistId) return;

    getData<SpotifyPlaylist>(`playlists/${playlistId}`)
      .then(result => result && setPlaylist(result))
      .catch(err => console.error(`Error fetching playlist ${playlistId}:`, err));
  }, [playlist, playlistId]);

  useEffect(() => {
    if (!playlistId) return;

    getPlaylistAnalysis(playlistId)
      .then(setAnalysis)
      .catch(err => {
        console.error(`Error analyzing playlist ${playlistId}:`, err);
        setAnalysis(null);
      });
  }, [playlistId]);

  return (
    <div className="bg-paper-bg text-paper-fg font-display min-h-screen">
      <PaperNav />

      <div className="max-w-300 mx-auto px-6 md:px-10 pt-7">
        <Link
          to="/analyze"
          className="font-mono text-xs tracking-[0.06em] uppercase text-paper-muted hover:text-paper-fg"
        >
          ← All Playlists
        </Link>
      </div>

      {playlist && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-300 mx-auto px-6 md:px-10 pt-9 pb-[50px] grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-11 items-end"
        >
          <div
            className="w-full sm:w-55 aspect-square bg-paper-border bg-cover bg-center border border-paper-border shrink-0"
            style={
              playlist.images[0]?.url
                ? { backgroundImage: `url(${playlist.images[0].url})` }
                : undefined
            }
          />
          <div>
            <div className="flex items-center gap-[10px] font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-4">
              <span className="w-2 h-2 bg-paper-accent inline-block" />
              Playlist Analysis
            </div>
            <h1 className="text-4xl sm:text-[52px] leading-none font-extrabold tracking-[-0.02em] mb-3.5">
              {playlist.name}
            </h1>
            <div className="font-mono text-[13px] text-paper-muted">
              {playlist.tracks.total} tracks
              {analysis && ` · ${analysis.totalDuration} total`}
            </div>
          </div>
        </motion.div>
      )}

      {analysis === undefined && (
        <div className="max-w-300 mx-auto px-6 md:px-10 py-16">
          <div className="font-mono text-xs text-paper-muted">Analyzing playlist…</div>
        </div>
      )}

      {analysis === null && (
        <div className="border-t border-paper-border">
          <div className="max-w-300 mx-auto px-6 md:px-10 py-16">
            <div className="font-mono text-xs text-paper-muted">
              Not enough data to analyze this playlist.
            </div>
          </div>
        </div>
      )}

      {analysis && (
        <>
          {/* TOP GENRES */}
          {analysis.topGenres.length > 0 && (
            <div className="border-t border-paper-border">
              <div className="max-w-300 mx-auto px-6 md:px-10 py-12">
                <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-7">
                  Top 3 Genres
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border border-paper-border">
                  {analysis.topGenres.map((genre, i) => {
                    const isFirst = i === 0;
                    return (
                      <div
                        key={genre.name}
                        className={`p-8 border-paper-border ${
                          i !== analysis.topGenres.length - 1 ? 'sm:border-r' : ''
                        } ${i !== 0 ? 'border-t sm:border-t-0' : ''} ${
                          isFirst ? 'bg-paper-accent text-paper-bg' : ''
                        }`}
                      >
                        <div className="font-mono text-[13px] font-bold mb-3.5">0{i + 1}</div>
                        <div className="text-[30px] font-extrabold tracking-[-0.01em] mb-2.5">
                          {genre.name}
                        </div>
                        <div
                          className={`font-mono text-sm ${isFirst ? 'opacity-85' : 'text-paper-muted'}`}
                        >
                          {genre.pct}% of tracks
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MOOD CALLOUT */}
          <div className="border-t border-paper-border">
            <div className="max-w-300 mx-auto px-6 md:px-10 py-14 text-center">
              <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-5">
                Overall Mood
              </div>
              <div className="text-3xl sm:text-[44px] font-extrabold tracking-[-0.02em]">
                <span className="font-serif italic font-normal text-paper-accent">
                  {analysis.mood}
                </span>
              </div>
              <div className="font-mono text-[13px] text-paper-muted mt-3.5">
                Based on valence, energy & danceability across all tracks
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
                {analysis.features.map(feature => (
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

          {/* SPEC SHEET */}
          <div className="border-t border-paper-border">
            <div className="max-w-300 mx-auto px-6 md:px-10 py-14">
              <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-8">
                Track Data
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-paper-border">
                {analysis.specs.map(spec => (
                  <div
                    key={spec.label}
                    className="border-r border-b border-paper-border px-5 py-[26px]"
                  >
                    <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-paper-muted mb-3">
                      {spec.label}
                    </div>
                    <div className="text-2xl font-extrabold tracking-[-0.01em]">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GRILL MY PLAYLIST */}
          <div className="border-t border-paper-border">
            <div className="max-w-300 mx-auto px-6 md:px-10 py-14 pb-24">
              <div className="font-mono text-xs tracking-[0.18em] uppercase text-paper-muted mb-7">
                Grill My Playlist
              </div>
              <div className="border border-paper-border p-9 md:p-12">
                <div className="text-3xl sm:text-[40px] font-extrabold tracking-[-0.02em] mb-8 max-w-160">
                  <span className="font-serif italic font-normal text-paper-accent">
                    {analysis.grill.headline}
                  </span>
                </div>
                <div className="flex flex-col gap-5 max-w-160">
                  {analysis.grill.lines.map((line, i) => (
                    <div key={line} className="flex gap-4 items-start">
                      <span className="font-mono text-xs font-bold text-paper-muted shrink-0 pt-[2px]">
                        0{i + 1}
                      </span>
                      <p className="text-[15px] leading-[1.6] text-paper-fg">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default PlaylistDetail;
