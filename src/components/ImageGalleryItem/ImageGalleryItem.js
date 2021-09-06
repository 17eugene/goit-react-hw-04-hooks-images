import styles from "./GalleryItem.module.css";

function ImageGalleryItem({ id, alt, webformatURL, largeImageURL, click }) {
  return (
    <li key={id} className={styles.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={alt}
        onClick={() => {
          click(largeImageURL, alt);
        }}
        className={styles.imageGalleryItem_image}
      />
    </li>
  );
}

export { ImageGalleryItem };
