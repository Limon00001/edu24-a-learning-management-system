/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 02 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Play } from 'lucide-react';

// VideoThumbnail Component
const VideoThumbnail = ({ imageUrl, title, duration }) => {
  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden">
      {/* Thumbnail Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 transition-opacity hover:bg-black/40" />
      </div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-110">
          <Play className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Video Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-medium truncate">{title}</h3>
        {duration && (
          <span className="text-sm text-gray-200 mt-1">{duration}</span>
        )}
      </div>

      {/* Duration Badge */}
      {duration && (
        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-black/70 text-white rounded">
          {duration}
        </div>
      )}
    </div>
  );
};

// Export
export default VideoThumbnail;
