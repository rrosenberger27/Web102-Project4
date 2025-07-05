import React from "react";

const MainItem = ({props}) => {

    return (
        <div className="mainItemContainer">
        {props.status === "full" && (
            <>
            <img src={props.coverImg}/>
            <div className="bookInfo">
                <h2> Title : {props.title} </h2>
                <button> Author : {props.author} </button>
                <button> Main subject : {props.subject} </button>
                <button> Published in : {props.pub_year} </button>
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