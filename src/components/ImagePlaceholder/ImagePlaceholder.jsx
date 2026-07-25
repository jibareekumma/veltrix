


import "../../css/ImagePlaceholder.css"

const ImagePlaceholder = function ({ className = "", ratio = "1/1", label = "" }) {
  return (
    <div className={`image-placeholder ${className}`} 
    style={{ aspectRatio: ratio }}>
      {label && <span 
      className="image-placeholder__label">
        {label}</span>}
    </div>
  );
};

export default ImagePlaceholder;