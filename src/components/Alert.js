import React from 'react';

const Alert = (props) => {
  const alert = props.winner ? "The Winner Is: " + props.winner : "It is " + props.currentText + "'s turn.";
  return (
    <header>{alert}</header>
  );
}

export default Alert;