import "./NotFound.module.css";

export default function NotFound(props) {
  return (
    <div className="content">
      <svg viewBox="0 0 960 300">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="50%">
            404
          </text>
        </symbol>

        <g className="g-ants">
          <use xlinkHref="#s-text" className="text"></use>
          <use xlinkHref="#s-text" className="text"></use>
          <use xlinkHref="#s-text" className="text"></use>
          <use xlinkHref="#s-text" className="text"></use>
          <use xlinkHref="#s-text" className="text"></use>
        </g>
      </svg>
    </div>
  );
}
