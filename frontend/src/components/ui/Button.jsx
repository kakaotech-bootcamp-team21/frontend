import React from "react"
import Button from 'react-bootstrap/Button';

function ButtonExample(props) {
    const { title, onClick } = props;

    return (
        <Button onClick={onClick} variant="primary">{title || "button"}</Button>
    );
  }
  
  export default ButtonExample;