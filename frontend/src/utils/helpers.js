import clsx from "clsx";

export function cn(...inputs) {
  return clsx(...inputs);
}

export const getYoutubeEmbedUrl = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
};  