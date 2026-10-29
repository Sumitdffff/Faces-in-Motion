import { useCallback, useMemo, useState } from "react";
import Wall from "./components/Wall.jsx";
import Lightbox from "./components/Lightbox.jsx";
import Headline from "./components/Headline.jsx";
import { usePhotos } from "./usePhotos.js";

export default function App() {
  const photos = usePhotos();
  const [openIndex, setOpenIndex] = useState(null);
  const [touched, setTouched] = useState(false);
  const onInteract = useCallback(() => setTouched(true), []);

  // Keep the same array between renders so the wall's animation loop is not restarted.
  const images = useMemo(() => (photos ? photos.map((p) => p.css) : []), [photos]);

  if (!photos) return null;

  return (
    <>
      <Wall
        images={images}
        paused={openIndex !== null}
        onOpen={setOpenIndex}
        onInteract={onInteract}
      />
      <Headline />
      <div className={`hint${touched ? " gone" : ""}`}>
        Drag to explore &middot; click a photo to open it
      </div>
      <Lightbox
        photos={photos}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
