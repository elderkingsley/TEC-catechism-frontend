import { useState, useEffect } from 'react';
import { tracksAPI } from '../services/api';
import TrackList from '../components/TrackList';
import AudioPlayer from '../components/AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Fetch tracks when component mounts
  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tracksAPI.getAll();
      setTracks(response.data);
    } catch (err) {
      setError('Failed to load tracks. Please try again later.');
      console.error('Error fetching tracks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Catechism Audio Library
        </h1>
        <p className="text-gray-600">
          Listen to catechism teachings anytime, anywhere
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading tracks...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-medium">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchTracks}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Track List */}
      {!loading && !error && (
        <>
          {tracks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No tracks available yet.</p>
              <p className="text-gray-400 text-sm mt-2">
                Check back later for new content!
              </p>
            </div>
          ) : (
            <>
              <TrackList
                tracks={tracks}
                currentTrack={currentTrack}
                onTrackSelect={handleTrackSelect}
              />

              {/* Audio Player - Fixed at bottom */}
              {currentTrack && (
                <AudioPlayer
                  track={currentTrack}
                  onClose={() => setCurrentTrack(null)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
