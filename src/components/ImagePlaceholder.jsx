import './ImagePlaceholder.css';

/**
 * Styled placeholder for images that haven't been added yet.
 * Displays a camera icon + "Image Here" text.
 * 
 * Props:
 *   - label: optional custom label (default: "Image Here")
 *   - className: optional extra class
 *   - style: optional inline style overrides
 */
export default function ImagePlaceholder({ label = 'Image Here', className = '', style = {} }) {
  return (
    <div className={`img-placeholder ${className}`} style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>{label}</span>
    </div>
  );
}
