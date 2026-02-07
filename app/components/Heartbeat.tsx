import React from "react";
import styles from "./Heartbeat.module.css";

type HeartbeatProps = {
  from?: string;
};

export default function Heartbeat({ from }: HeartbeatProps) {
  const sender = from ? String(from).trim() : "Someone";
  return (
    <div className={styles.container} aria-live="polite">
      <div className={styles.heartWrapper}>
        <svg
          className={styles.pulse}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Pulsing heart"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff6b9a" />
              <stop offset="100%" stopColor="#ff165d" />
            </linearGradient>
          </defs>
          <path
            fill="url(#g)"
            d="M12 21s-7.5-4.95-9.33-7.04C.9 11.86 2.02 6.7 6.04 5.06 8.4 3.98 10.6 5.1 12 6.5c1.4-1.4 3.6-2.52 5.96-1.44 4.02 1.64 5.14 6.8 3.37 8.9C19.5 16.05 12 21 12 21z"
          />
        </svg>

        <div className={styles.floatContainer} aria-hidden>
          <svg className={styles.smallHeart} viewBox="0 0 24 24">
            <path
              fill="#ff6b9a"
              d="M12 21s-7.5-4.95-9.33-7.04C.9 11.86 2.02 6.7 6.04 5.06 8.4 3.98 10.6 5.1 12 6.5c1.4-1.4 3.6-2.52 5.96-1.44 4.02 1.64 5.14 6.8 3.37 8.9C19.5 16.05 12 21 12 21z"
            />
          </svg>
          <svg className={styles.smallHeart} viewBox="0 0 24 24">
            <path
              fill="#ff165d"
              d="M12 21s-7.5-4.95-9.33-7.04C.9 11.86 2.02 6.7 6.04 5.06 8.4 3.98 10.6 5.1 12 6.5c1.4-1.4 3.6-2.52 5.96-1.44 4.02 1.64 5.14 6.8 3.37 8.9C19.5 16.05 12 21 12 21z"
            />
          </svg>
          <svg className={styles.smallHeart} viewBox="0 0 24 24">
            <path
              fill="#ff9bb3"
              d="M12 21s-7.5-4.95-9.33-7.04C.9 11.86 2.02 6.7 6.04 5.06 8.4 3.98 10.6 5.1 12 6.5c1.4-1.4 3.6-2.52 5.96-1.44 4.02 1.64 5.14 6.8 3.37 8.9C19.5 16.05 12 21 12 21z"
            />
          </svg>
          <svg className={styles.smallHeart} viewBox="0 0 24 24">
            <path
              fill="#ff4a7a"
              d="M12 21s-7.5-4.95-9.33-7.04C.9 11.86 2.02 6.7 6.04 5.06 8.4 3.98 10.6 5.1 12 6.5c1.4-1.4 3.6-2.52 5.96-1.44 4.02 1.64 5.14 6.8 3.37 8.9C19.5 16.05 12 21 12 21z"
            />
          </svg>
        </div>
      </div>

      <div>
        <div className={styles.label}>Happy Valentine's Day!</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Wishing you a joyful day 💖
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: "#9ca3af" }}>
          from {sender}
        </div>
      </div>
    </div>
  );
}
