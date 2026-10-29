import { useEffect, useRef } from "react";
import PhotoInfoPanel from "./PhotoInfoPanel";
import CommentsPanel from "./CommentsPanel";
import "./photo-details.css";

const mod = (a, n) => ((a % n) + n) % n;

export default function Lightbox({ photos, index, onChange, onClose }) {
  const open = index !== null;
  const closeRef = useRef(null);
  const n = photos.length;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      // don't steal keys while the user is typing a comment
      const tag = e.target?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "Escape") {
        if (typing) e.target.blur();
        else onClose();
        return;
      }
      if (typing) return;
      if (e.key === "ArrowLeft") onChange(mod(index - 1, n));
      if (e.key === "ArrowRight") onChange(mod(index + 1, n));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, n, onChange, onClose]);

  const current = open ? photos[index] : null;
  const go = (e, d) => {
    e.stopPropagation();
    onChange(mod(index + d, n));
  };
  const stop = (e) => e.stopPropagation();

  return (
    <div
      className={`lightbox${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      {/* soft coloured glow made from the open photo */}
      <div
        className="pd-ambient"
        aria-hidden="true"
        style={{ backgroundImage: current ? current.css : "none" }}
      />

      <button
        ref={closeRef}
        className="close"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        Close
      </button>

      <div className="pd-layout">
        {/* LEFT: person details + about the image */}
        <div onClick={stop}>
          {open && <PhotoInfoPanel photoId={index} caption={current?.caption} />}
        </div>

        {/* CENTER: photo, arrows and caption */}
        <div className="pd-center">
          <div className="viewer">
            <button className="nav" type="button" aria-label="Previous photo" onClick={(e) => go(e, -1)}>
              &#8592;
            </button>
            <div
              className="photo"
              style={{ backgroundImage: current ? current.css : "none" }}
              onClick={(e) => go(e, 1)}
            />
            <button className="nav" type="button" aria-label="Next photo" onClick={(e) => go(e, 1)}>
              &#8594;
            </button>
          </div>
          <p className="caption">{current ? current.caption : ""}</p>
        </div>

        {/* RIGHT: live comments */}
        <div onClick={stop}>
          {open && <CommentsPanel photoId={index} />}
        </div>
      </div>
    </div>
  );
}
