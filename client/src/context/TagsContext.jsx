import React, { createContext, useState } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const TagContext = createContext(undefined);
const TagDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function TagProvider({ children }) {
  const [TagDetails, setTagDetails] = useState({
    tag: {..."Web App"}
  });

  return (
    <TagContext.Provider value={TagDetails}>
      <TagDispatchContext.Provider value={setTagDetails}>
        {children}
      </TagDispatchContext.Provider>
    </TagContext.Provider>
  );
}

export { TagProvider, TagContext, TagDispatchContext };