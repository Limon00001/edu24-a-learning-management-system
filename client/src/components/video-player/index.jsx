/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 27 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Pause, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

// Internal Imports
import {
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

// VideoPlayer Component
const VideoPlayer = ({ width = '100%', height = '100%', url }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const handlePlayAndPause = () => {
    setPlaying((prev) => !prev);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleRewind = () => {
    if (playerRef?.current) {
      playerRef?.current?.seekTo(
        playerRef?.current?.getCurrentTime() - 5,
        'fraction',
      );
    }
  };

  const handleForward = () => {
    if (playerRef?.current) {
      playerRef?.current?.seekTo(
        playerRef?.current?.getCurrentTime() + 5,
        'fraction',
      );
    }
  };

  const handleToggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleSeekChange = (newValue) => {
    setPlayed(newValue[0]);
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    if (playerRef?.current) {
      playerRef?.current?.seekTo(played, 'fraction');
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (newVolume === 0) {
      setMuted(true);
    } else if (muted) {
      setMuted(false);
    }
  };

  const pad = (string) => {
    return ('0' + string).slice(-2);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());

    if (hh) return `${hh}:${pad(mm)}:${ss}`;

    return `${mm}:${ss}`;
  };

  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef?.current.requestFullscreen) {
        playerContainerRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullScreen]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div
      ref={playerContainerRef}
      className={
        `relative bg-gray-900 rounded-lg transition-all duration-300 overflow-hidden shadow-lg` +
        (isFullScreen ? ' w-screen h-screen' : ' ')
      }
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        className="absolute top-0 left-0"
      />
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t 
        from-black/90 via-black/50 to-transparent opacity-75 transition-all 
        duration-300 ease-in-out ${showControls ? 'opacity-100' : 'opacity-0'}`}
        >
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleSeekMouseUp}
            className={'mb-4 w-full'}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handlePlayAndPause}
                className={
                  'cursor-pointer text-white bg-transparent hover:text-white hover:bg-gray-700'
                }
              >
                {playing ? (
                  <Pause className="w-6 h-6 cursor-pointer" />
                ) : (
                  <Play className="w-6 h-6 cursor-pointer" />
                )}
              </Button>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handleRewind}
                className={
                  'cursor-pointer text-white hover:text-white bg-transparent hover:bg-gray-700'
                }
              >
                <RotateCcw className="w-6 h-6 cursor-pointer" />
              </Button>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handleForward}
                className={
                  'cursor-pointer text-white hover:text-white bg-transparent hover:bg-gray-700'
                }
              >
                <RotateCw className="w-6 h-6 cursor-pointer" />
              </Button>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handleToggleMute}
                className={
                  'cursor-pointer text-white hover:text-white bg-transparent hover:bg-gray-700'
                }
              >
                {muted ? (
                  <VolumeX className="w-6 h-6 cursor-pointer" />
                ) : (
                  <Volume2 className="w-6 h-6 cursor-pointer" />
                )}
              </Button>
              <Slider
                defaultValue={[volume * 100]}
                value={[muted ? 0 : volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className={'ml-2 w-24'}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-white text-sm">
                {formatTime(played * (playerRef?.current?.getDuration() || 0))}
                {' / '}
                {formatTime(playerRef?.current?.getDuration() || 0)}
              </div>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handleFullScreen}
                className={
                  'cursor-pointer text-white hover:text-white bg-transparent hover:bg-gray-700'
                }
              >
                {isFullScreen ? (
                  <Minimize className="w-6 h-6 cursor-pointer" />
                ) : (
                  <Maximize className="w-6 h-6 cursor-pointer" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export
export default VideoPlayer;
