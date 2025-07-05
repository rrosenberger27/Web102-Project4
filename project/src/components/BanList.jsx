import React from "react";
import "../styles/BanList.css";

const BanList = ({banList, removeFromBanned}) => {

    return (
        <div className="ban-list-container">
            <h1>
                Ban List
            </h1>

            {banList.map(item => (
                <button onClick={() => {removeFromBanned(item)}}>
                    {item}
                </button>
            ))}

        </div>
    )
}

export default BanList;