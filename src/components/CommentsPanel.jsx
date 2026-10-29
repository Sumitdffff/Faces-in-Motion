import { useEffect, useRef, useState } from "react";
import { getSeedComments, getAccent } from "./photoMeta";
import "./photo-details.css";

const storageKey = (id) => `drift-comments-v2-${id}`;

function load(id) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(id)));
    if (Array.isArray(saved)) return saved;
  } catch {}
  const seeded = getSeedComments(id);
  try {
    localStorage.setItem(storageKey(id), JSON.stringify(seeded));
  } catch {}
  return seeded;
}

// Colourful avatar per commenter name
const hue = (name) => [...name].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 17);
const avatarBg = (name) =>
  name === "You"
    ? "linear-gradient(135deg, var(--a1), var(--a2))"
    : `linear-gradient(135deg, hsl(${hue(name)} 75% 64%), hsl(${(hue(name) + 45) % 360} 75% 56%))`;

// Right side of the lightbox: scrollable live comments for the open photo.
export default function CommentsPanel({ photoId, currentUser = "You" }) {
  const [comments, setComments] = useState(() => load(photoId));
  const [text, setText] = useState("");
  const listRef = useRef(null);
  const justPosted = useRef(false);
  const [a1, a2] = getAccent(photoId);

  useEffect(() => {
    setComments(load(photoId));
    setText("");
    justPosted.current = false;
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [photoId]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === storageKey(photoId)) setComments(load(photoId));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [photoId]);

  const save = (next) => {
    setComments(next);
    try {
      localStorage.setItem(storageKey(photoId), JSON.stringify(next));
    } catch {}
  };

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    justPosted.current = true;
    save([
      ...comments,
      { id: Date.now(), name: currentUser, text: value, likes: 0, liked: false, at: Date.now() },
    ]);
    setText("");
  };

  const toggleLike = (id) =>
    save(
      comments.map((c) =>
        c.id === id ? { ...c, liked: !c.liked, likes: c.likes + (c.liked ? -1 : 1) } : c
      )
    );

  useEffect(() => {
    if (justPosted.current && listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      justPosted.current = false;
    }
  }, [comments.length]);

  return (
    <aside
      className="pd-panel pd-comments pd-card"
      aria-label="Comments"
      style={{ "--a1": a1, "--a2": a2 }}
    >
      <h4 className="pd-label pd-comments-title">
        Comments <span className="pd-count">{comments.length}</span>
      </h4>

      <ul className="pd-comment-list" ref={listRef}>
        {comments.length === 0 && <li className="pd-empty">No comments yet. Be the first!</li>}
        {comments.map((c) => (
          <li key={c.id} className="pd-comment">
            <span className="pd-c-avatar" style={{ background: avatarBg(c.name) }} aria-hidden="true">
              {c.name.charAt(0)}
            </span>
            <div className="pd-c-body">
              <div className="pd-comment-top">
                <span className="pd-comment-name">{c.name}</span>
                <time className="pd-comment-time">{timeAgo(c.at)}</time>
              </div>
              <p className="pd-comment-text">{c.text}</p>
              <button
                type="button"
                className={`pd-like ${c.liked ? "is-liked" : ""}`}
                onClick={() => toggleLike(c.id)}
                aria-pressed={c.liked}
              >
                ♥ {c.likes}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form className="pd-form" onSubmit={submit}>
        <input
          className="pd-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment…"
          maxLength={300}
          aria-label="Add a comment"
        />
        <button className="pd-send" type="submit" disabled={!text.trim()}>
          Post
        </button>
      </form>
    </aside>
  );
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
