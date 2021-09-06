import React, { useState } from "react";

import styles from "./Searchbar.module.css";

function Searchbar({ submit }) {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      alert("No query entered");
      return;
    }

    submit(query);
    setQuery("");
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={onHandleSubmit}>
        <button type="submit" className={styles.searchForm_button}>
          <span className={styles.searchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
          value={query}
        />
      </form>
    </header>
  );
}

// class Searchbar extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       query: "",
//     };
//   }

//   handleQueryChange = (e) => {
//     this.setState({ query: e.currentTarget.value.toLowerCase() });
//   };

//   onHandleSubmit = (e) => {
//     e.preventDefault();

//     if (this.state.query.trim() === "") {
//       alert("No query entered");
//       return;
//     }

//     this.props.submit(this.state.query);
//     this.setState({ query: "" });
//   };

//   render() {
//     return (
//       <header className={styles.searchbar}>
//         <form className={styles.searchForm} onSubmit={this.onHandleSubmit}>
//           <button type="submit" className={styles.searchForm_button}>
//             <span className={styles.searchForm_button_label}>Search</span>
//           </button>

//           <input
//             className={styles.searchForm_input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleQueryChange}
//             value={this.state.query}
//           />
//         </form>
//       </header>
//     );
//   }
// }

export { Searchbar };
