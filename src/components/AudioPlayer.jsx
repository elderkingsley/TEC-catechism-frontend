import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faVolumeHigh, 
  faVolumeLow, 
  faVolumeXmark,
  faXmark 
} from '@fortawesome/free-solid-svg-icons';

function AudioPlayer({ track, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Load and play new track when track changes
  useEffect(() => {
    if (audioRef.current && track) {
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Playback failed:', err));
    }
  }, [track]);

  // Update current time as audio plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Set duration when metadata loads
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Seek to specific time
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Change volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get volume icon based on volume level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return faVolumeXmark;
    if (volume < 0.5) return faVolumeLow;
    return faVolumeHigh;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-blue-600 z-50">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={track.bunny_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="container mx-auto px-4 py-4">
        {/* Track info and controls */}
        <div className="flex items-center justify-between mb-3">
          {/* Track Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-lg">
              {track.title}
            </h3>
            {track.artist && (
              <p className="text-sm text-gray-500">{track.artist}</p>
            )}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="mx-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
          >
            <FontAwesomeIcon 
              icon={isPlaying ? faPause : faPlay} 
              className={`text-xl ${!isPlaying && 'ml-1'}`} 
            />
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <FontAwesomeIcon icon={getVolumeIcon()} className="text-lg" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-red-500 transition"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-sm text-gray-600 w-12">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
