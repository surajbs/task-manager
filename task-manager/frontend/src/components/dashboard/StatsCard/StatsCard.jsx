import "./StatsCard.css";

const StatsCard = ({
  title,
  value,
  icon,
  color = "primary",
}) => {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-card-header">
        <span className="stats-card-title">
          {title}
        </span>

        <div className="stats-card-icon">
          {icon}
        </div>
      </div>

      <h2 className="stats-card-value">
        {value}
      </h2>
    </div>
  );
};

export default StatsCard;