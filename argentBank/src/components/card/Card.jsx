import React from "react";
import './card.css'
export default function Card({ img, title, content, alt }) {
    
    return (
        <article className="card-feature">
         <img src={img} alt={alt} className="feature-icon" />
         <h3>{title}</h3>
         <p>{content}</p>
      </article>
    )
};