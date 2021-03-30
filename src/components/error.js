import React from "react";
import "./error.css";
export default function ErrorComponent(props) {
  if (props.errorProps) {
    var { type, content } = props.errorProps;
  }

  switch (type) {
    case "info":
      return <div className="info">{content}</div>;
    case "error" || "failed":
      return <div className="error">{content}</div>;
    case "success":
      return <div className="success">{content}</div>;
    case "validation":
      return <div className="validation">{content}</div>;
    case "warn" || "warning":
      return <div className="warning">{content}</div>;
    default:
      return <div></div>;
  }
}
