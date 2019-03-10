import React from "react";
import { Button } from "react-bootstrap";
import "./Square.css";

function Square(props) {
  return (
    <Button className={props.squareColor} onClick={props.onClick}>
      {props.value}
    </Button>
  );
}

export default Square;
