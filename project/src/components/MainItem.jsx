import React from "react";

const MainItem = ({coverImg, author, subjects, description}) => {
    strSubjects = subjects.join(", ");

    return (
        <div className="mainItemContainer">
            <img src={coverImg}/>
            <div className="bookInfo">
                <h4> Author : {author} </p>
                <h6> Subjects : {strSubjects} </h6>
                <p> Description : {description}</p>
            </div>


        </div>
    )

}

export default MainItem;

// https://openlibrary.org/works/{work_id}.json
// https://openlibrary.org/subjects/{subject}.json
// Returns JSON with:

// Work title
// Cover image IDs
// Authors
// Subjects
// Edition counts

// To get cover image : https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg
//size can be S for small, M for medium, and L for large