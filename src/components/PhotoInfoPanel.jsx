import { useEffect, useState } from "react";
import { getPhotoMeta, getAccent } from "./photoMeta";
import "./photo-details.css";

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : String(n));

// Left side of the lightbox: person card + full image information
export default function PhotoInfoPanel({ photoId, caption }) {
  const { person, description, story, details, tags, poseTip, stats } = getPhotoMeta(photoId, caption);
  const [a1, a2] = getAccent(photoId);

  const followKey = `drift-follow-${person.name}`;
  const readFollow = () => {
    try {
      return localStorage.getItem(followKey) === "1";
    } catch {
      return false;
    }
  };
  const [following, setFollowing] = useState(readFollow);

  useEffect(() => {
    setFollowing(readFollow());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followKey]);

  const toggleFollow = () => {
    const next = !following;
    setFollowing(next);
    try {
      localStorage.setItem(followKey, next ? "1" : "0");
    } catch {}
  };

  const rows = [
    ["🎭", "Mood", details.mood],
    ["💡", "Lighting", details.lighting],
    ["📍", "Location", details.location],
    ["📷", "Camera", details.camera],
    ["🔭", "Lens", details.lens],
    ["⚙️", "Settings", details.settings],
    ["📅", "Shot on", details.date],
  ];

  return (
    <aside
      className="pd-panel pd-info"
      aria-label="About this photo"
      style={{ "--a1": a1, "--a2": a2 }}
    >
      <section className="pd-card pd-person">
        <div className="pd-person-head">
          <div className="pd-avatar" aria-hidden="true">
            {person.name.charAt(0)}
          </div>
          <div className="pd-person-text">
            <h3 className="pd-name">{person.name}</h3>
            <div className="pd-chips">
              <span className="pd-chip">{person.role}</span>
              <span className="pd-chip pd-chip-soft">Age {person.age}</span>
            </div>
          </div>
        </div>

        <p className="pd-about">{person.about}</p>

        <div className="pd-person-stats">
          <div>
            <strong>{fmt(person.followers + (following ? 1 : 0))}</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>{person.posts}</strong>
            <span>Photos</span>
          </div>
          <div>
            <strong>{fmt(stats.likes)}</strong>
            <span>Likes</span>
          </div>
        </div>

        <button
          type="button"
          className={`pd-follow ${following ? "is-following" : ""}`}
          onClick={toggleFollow}
        >
          {following ? "✓ Following" : "+ Follow"}
        </button>
      </section>

      <section className="pd-card">
        <h4 className="pd-label">About the image</h4>
        <h5 className="pd-image-title">{details.title}</h5>
        <p className="pd-about pd-first">{description}</p>

        <ul className="pd-tags">
          {tags.map((t) => (
            <li key={t} className="pd-tag">
              #{t}
            </li>
          ))}
        </ul>

        <h4 className="pd-label pd-sub">Behind the shot</h4>
        <p className="pd-about pd-first">{story}</p>

        <h4 className="pd-label pd-sub">Photo details</h4>
        <dl className="pd-specs">
          {rows.map(([icon, k, v]) => (
            <div key={k} className="pd-spec-row">
              <dt>
                <span aria-hidden="true">{icon}</span> {k}
              </dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="pd-tip">
          <span className="pd-tip-label">✨ Pose tip</span>
          <p>{poseTip}</p>
        </div>

        <div className="pd-stats">
          <span>👁 {fmt(stats.views)} views</span>
          <span>♥ {fmt(stats.likes)} likes</span>
        </div>
      </section>
    </aside>
  );
}
