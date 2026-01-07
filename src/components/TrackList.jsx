import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faMusic, faClock, faUser } from '@fortawesome/free-solid-svg-icons';

function TrackList({ tracks, currentTrack, onTrackSelect }) {
  
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const mb = (parseInt(bytes) / (1024 * 1024)).toFixed(2);
    return `${mb} MB`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
          <FontAwesomeIcon icon={faMusic} className="mr-2" />
          Available Tracks ({tracks.length})
        </h2>
      </div>

      {/* Track List */}
      <div className="divide-y divide-gray-200">
        {tracks.map((track) => {
          const isPlaying = currentTrack?.id === track.id;
          
          return (
            <div
              key={track.id}
              className={`
                px-6 py-4 hover:bg-blue-50 cursor-pointer transition
                ${isPlaying ? 'bg-blue-100' : ''}
              `}
              onClick={() => onTrackSelect(track)}
            >
              <div className="flex items-center justify-between">
                {/* Left side - Track info */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* Play button */}
                  <button
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-all
                      ${isPlaying 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white'
                      }
                    `}
                  >
                    <FontAwesomeIcon icon={faPlay} className="ml-0.5" />
                  </button>

                  {/* Track details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {track.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      {track.artist && (
                        <span className="flex items-center">
                          <FontAwesomeIcon icon={faUser} className="mr-1 text-xs" />
                          {track.artist}
                        </span>
                      )}
                      {track.album && (
                        <span>• {track.album}</span>
                      )}
                      {track.uploader && (
                        <span className="text-xs">
                          Uploaded by {track.uploader.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Duration and file size */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {formatDuration(track.duration)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatFileSize(track.file_size)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrackList;
