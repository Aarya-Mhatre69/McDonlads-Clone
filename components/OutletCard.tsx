export interface Outlet {
  id: string;
  name: string;
  area: string;
  distance: number;       // km
  isOpen: boolean;
  deliveryTime: number;   // minutes
  rating: number;         // out of 5
  imageUrl: string;
  address: string;
  tags: string[];
}

interface OutletCardProps {
  outlet: Outlet;
}

export default function OutletCard({ outlet }: OutletCardProps) {
  return (
    <article
      id={`outlet-card-${outlet.id}`}
      className="outlet-card"
      aria-label={`${outlet.name} outlet`}
    >
      {/* Thumbnail */}
      <div className="outlet-card-image-wrap">
        <img
          src={outlet.imageUrl}
          alt={`${outlet.name} — McDonald's outlet`}
          className="outlet-card-image"
          loading="lazy"
        />
        {/* Open/Closed badge */}
        <span
          className={`outlet-status-badge ${outlet.isOpen ? "outlet-open" : "outlet-closed"}`}
          aria-label={outlet.isOpen ? "Open now" : "Currently closed"}
        >
          {outlet.isOpen ? "● Open" : "● Closed"}
        </span>
      </div>

      {/* Body */}
      <div className="outlet-card-body">
        <div className="outlet-card-header">
          <div>
            <h3 className="outlet-name">{outlet.name}</h3>
            <p className="outlet-area">{outlet.area}</p>
          </div>
          {/* Rating chip */}
          <div className="outlet-rating" aria-label={`Rated ${outlet.rating} out of 5`}>
            <span className="outlet-rating-star" aria-hidden="true">★</span>
            {outlet.rating.toFixed(1)}
          </div>
        </div>

        {/* Address */}
        <p className="outlet-address">{outlet.address}</p>

        {/* Tags */}
        {outlet.tags.length > 0 && (
          <div className="outlet-tags" aria-label="Features">
            {outlet.tags.map((tag) => (
              <span key={tag} className="outlet-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Footer: distance + delivery time + CTA */}
        <div className="outlet-card-footer">
          <div className="outlet-meta">
            <span className="outlet-meta-item" aria-label={`${outlet.distance} km away`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {outlet.distance} km
            </span>
            <span className="outlet-meta-divider" aria-hidden="true">·</span>
            <span className="outlet-meta-item" aria-label={`${outlet.deliveryTime} minute delivery`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {outlet.deliveryTime} mins
            </span>
          </div>

          <a
            href={`/outlets/${outlet.id}`}
            id={`outlet-order-btn-${outlet.id}`}
            className="outlet-order-btn"
            aria-label={`Order from ${outlet.name}`}
          >
            Order Now
          </a>
        </div>
      </div>
    </article>
  );
}
