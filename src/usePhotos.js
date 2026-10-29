import { useEffect, useState } from "react";
import { PHOTOS, captionFrom } from "./photos.js";
import { makePlaceholders } from "./placeholders.js";

// Loads every photo in photos.js, keeps the ones that exist (in list order),
// and falls back to placeholders if none load.
export function usePhotos() {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL;
    let left = PHOTOS.length;
    const results = new Array(PHOTOS.length);

    const finish = () => {
      if (cancelled) return;
      const loaded = results.filter(Boolean);
      setPhotos(loaded.length ? loaded : makePlaceholders());
    };

    if (!left) {
      finish();
      return;
    }
    PHOTOS.forEach((file, i) => {
      const url = `${base}images/${encodeURI(file)}`;
      const img = new Image();
      img.onload = () => {
        results[i] = { css: `url("${url}")`, caption: captionFrom(file) };
        if (!--left) finish();
      };
      img.onerror = () => {
        if (!--left) finish();
      };
      img.src = url;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return photos;
}
