import React from "react";

export default function Background(props) {
  return (
    <div
      style={{ width: "100%", height: "100%", margin: 0 }}
      class="background"
    >
      {props.children}
    </div>
  );
}
