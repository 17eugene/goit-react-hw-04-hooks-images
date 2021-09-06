import React, { useState } from "react";

import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";

function App() {
  const [query, setQuery] = useState("");

  const handleFormSubmit = (query) => {
    setQuery(query);
  };

  return (
    <div>
      <Searchbar submit={handleFormSubmit} />
      <ImageGallery query={query} />
    </div>
  );
}

export { App };
