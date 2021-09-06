import React, { useEffect } from "react";

import styles from "./Modal.module.css";

function Modal({ close, largeImageURL, alt }) {
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  });

  const keydownHandler = (e) => {
    if (e.code === "Escape") {
      close();
    }
  };

  const onBackdropCloseClick = (e) => {
    if (e.currentTarget === e.target) {
      close();
    }
  };

  return (
    <div className={styles.overlay} onClick={onBackdropCloseClick}>
      <div className={styles.modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
}

// class Modal extends React.Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.keydownHandler);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.keydownHandler);
//   }

//   keydownHandler = (e) => {
//     if (e.code === "Escape") {
//       this.props.close();
//     }
//   };

//   onBackdropCloseClick = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.close();
//     }
//   };
//   render() {
//     return (
//       <div className={styles.overlay} onClick={this.onBackdropCloseClick}>
//         <div className={styles.modal}>
//           <img src={this.props.largeImageURL} alt={this.props.alt} />
//         </div>
//       </div>
//     );
//   }
// }

export { Modal };
