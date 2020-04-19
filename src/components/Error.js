import React from "react";

export default () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ fontSize: 64, color: "#3f51b5" }}>404 Page</h4>
        <h3 style={{ fontSize: 32, marginBottom: "24px", fontWeight: 400 }}>
          WE ARE SORRY
        </h3>
        <span style={{ fontSize: 18, fontWeight: "normal", lineHeight: 3 }}>
          The page or the Question doesn't exist ..
          <br />
          Please back to <a href="/">Home Page</a> to find all the available
          questions
          <br />
        </span>
      </div>
    </div>
  );
};
