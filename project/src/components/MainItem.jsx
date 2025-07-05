import React from "react";
import "../styles/MainItem.css";

const MainItem = ({props, addToBanned}) => {

    return (
        <div className="main-item-container">
        {props.status === "full" && (
            <>
            <img src={props.coverImg}/>
            <h2> {props.title} </h2>
            <div className="book-info">
                <button onClick={() => {addToBanned(props.author)}}> By {props.author} </button>
                <button onClick={() => {addToBanned(props.subject)}}> {props.subject} </button>
                <button onClick={() => {addToBanned(props.pub_year)}}> {props.pub_year} </button>
            </div>
            </>
        )}
        {props.status === "error" && (
            <>
            <h3> An Error Occured Trying to Get Your Book. Please try clicking again. </h3>
            </>
        )}
        
            
        </div>
    )

}

export default MainItem;