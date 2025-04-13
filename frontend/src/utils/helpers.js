import clsx from "clsx";

export function cn(...inputs) {
  return clsx(...inputs);
}

// Helper function to convert a YouTube URL into an embed URL.
export const getYoutubeEmbedUrl = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
};  