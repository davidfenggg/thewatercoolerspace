import React from "react";

export default function Background(props) {
  return (
    <div style={{ width: "100%", height: "100%", margin: 0 }} id="myDiv">
      {setColor()}
      {props.children}
    </div>
  );
}

function randomColor() {
  return (
    "#" + ("000000" + ((Math.random() * 0xffffff) << 0).toString(16)).slice(-6)
  );
}

function setColor() {
  document.getElementById("myDiv").style.backgroundColor = randomColor();
  setTimeout(setColor, 2000);
}
