import styles from "./badge.module.css";

export default function StatBadge({ value, label, color }) {
  return (
    <div className={`${styles.badge} ${styles[color]}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
