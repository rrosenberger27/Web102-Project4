import React from "react";
import "../styles/SeenSoFar.css";

const SeenSoFar = ({seenSoFarList}) => {

    return (
        <div className="seen-so-far-container">
            <h1>Seen So Far</h1>
            {seenSoFarList.map(item => ( 
                <div className="mini-item-container">
                    <h2> {item.title} </h2>
                    <p> By {item.author} </p>
                    <p> Subject: {item.subject}</p>
                </div>
            ))}
        </div>
    )
}

export default SeenSoFar;