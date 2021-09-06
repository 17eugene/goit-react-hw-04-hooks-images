import React, { useState, useEffect } from "react";

import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";

import fetchImages from "../../services/ApiService";
import smoothScroll from "../../services/SmoothScroll";

import styles from "./ImageGallery.module.css";

function ImageGallery({ query }) {
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [largeIMG, setLargeIMG] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    setGallery([]);
  }, [query]);

  useEffect(() => {
    if (query.trim() === "") {
      setStatus("idle");
      return;
    }
    setStatus("pending");

    fetchImages(query)
      .then((gallery) => {
        if (gallery.total === 0) {
          return [setError("Image(s) not found"), setStatus("rejected")];
        }
        return [setGallery(gallery.hits), setStatus("resolved"), setPage(1)];
      })
      .catch((error) => setError(error), setStatus("rejected"));
  }, [query]);

  const loadMoreHandler = (e) => {
    fetchImages(query, page + 1)
      .then(
        (gallery) => setGallery((state) => [...state, ...gallery.hits]),
        setPage((state) => state + 1)
      )
      .then(() => smoothScroll());
  };

  const openModalHandler = (largeIMG, modalAlt) => {
    setLargeIMG(largeIMG);
    setModalAlt(modalAlt);
  };

  const closeModalHandler = () => {
    setLargeIMG("");
    setModalAlt("");
  };

  if (status === "idle") {
    return <Button className={styles.hidden} />;
  }

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "rejected") {
    return <p>{error}</p>;
  }

  if (status === "resolved") {
    return (
      <div className={styles.galleryContainer}>
        <ul className={styles.imageGallery}>
          {gallery.map((item) => (
            <ImageGalleryItem
              key={item.id}
              alt={item.tags}
              webformatURL={item.webformatURL}
              largeImageURL={item.largeImageURL}
              click={openModalHandler}
            />
          ))}
        </ul>
        <div className={styles.btnContainer}>
          <Button
            className={styles.button}
            btnName="Load more"
            onClick={loadMoreHandler}
          />
        </div>
        {largeIMG && (
          <Modal
            close={closeModalHandler}
            largeImageURL={largeIMG}
            alt={modalAlt}
          />
        )}
      </div>
    );
  }
}

// class ImageGallery extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       status: "idle",
//       page: 1,
//       gallery: null,
//       // error: null,
//     };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.query !== this.props.query) {
//       this.setState({ status: "pending" });

//       fetchImages(this.props.query)
//         .then((gallery) => {
//           if (gallery.total === 0) {
//             return this.setState({
//               error: "Image(s) not found",
//               status: "rejected",
//             });
//           }
//           return this.setState({
//             gallery: gallery.hits,
//             status: "resolved",
//             page: 1,
//           });
//         })
//         .catch((error) => this.setState({ error, status: "rejected" }));
//     }
//   }

//   loadMoreHandler = (e) => {
//     fetchImages(this.props.query, this.state.page + 1)
//       .then((gallery) =>
//         this.setState((prevState) => ({
//           gallery: [...prevState.gallery, ...gallery.hits],
//           page: prevState.page + 1,
//         }))
//       )
//       .then(() => smoothScroll());
//   };

//   openModalHandler = (largeImageURL, alt) => {
//     this.setState({
//       largeImageURL: largeImageURL,
//       alt: alt,
//     });
//   };

//   closeModalHandler = () => {
//     this.setState({
//       largeImageURL: "",
//       alt: "",
//     });
//   };

//   render() {
//     if (this.state.status === "idle") {
//       return <Button className={styles.hidden} />;
//     }

//     if (this.state.status === "pending") {
//       return <Loader />;
//     }

//     if (this.state.status === "rejected") {
//       return <p>{this.state.error}</p>;
//     }

//     if (this.state.status === "resolved") {
//       return (
//         <div className={styles.galleryContainer}>
//           <ul className={styles.imageGallery}>
//             {this.state.gallery.map((item) => (
//               <ImageGalleryItem
//                 key={item.id}
//                 alt={item.tags}
//                 webformatURL={item.webformatURL}
//                 largeImageURL={item.largeImageURL}
//                 click={this.openModalHandler}
//               />
//             ))}
//           </ul>
//           <div className={styles.btnContainer}>
//             <Button
//               className={styles.button}
//               btnName="Load more"
//               onClick={this.loadMoreHandler}
//             />
//           </div>
//           {this.state.largeImageURL && (
//             <Modal
//               close={this.closeModalHandler}
//               largeImageURL={this.state.largeImageURL}
//               alt={this.state.alt}
//             />
//           )}
//         </div>
//       );
//     }
//   }
// }

export { ImageGallery };
