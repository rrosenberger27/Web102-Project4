import { useState } from 'react'
import './App.css'

const getRandBookId = () => {
  const randNum = Math.floor(Math.random() * 20000000) + 1; 
  return `OL${randNum}M`; // would be OL W for works
}

function App() {
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

const randBookId = getRandBookId();
const apiUrl = `https://openlibrary.org/books/${randBookId}.json`
  
const getRandBook = async () => {
  try {
    const randBookId = getRandBookId();
    const apiUrl = `https://openlibrary.org/books/${randBookId}.json`
    
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.log(`Book Id ${randBookId} not found. Trying another...`);
      return getRandBook();
    }

    const bookJson = await res.json();
    return bookJson;

  } catch (error) {
    console.error("There was an error fetching the book:", error);
    alert("error in fetching book :(");
    return null;
  }

}

const getWorks = async (worksKey) => {
  const res = await fetch(`https://openlibrary.org${worksKey}.json`);
  const worksJson = await res.json();
  return worksJson;
};

(async () => {
  const book = await getRandBook();

  // First, check if the book and the works property exist
  if (book && book.works && book.works.length > 0) {
    console.log("Book Data:", book);

    // Correctly get the key from the first object in the works array
    const workKey = book.works[0].key; 
    
    console.log(`Fetching work with key: ${workKey}`);
    const works = await getWorks(workKey);
    console.log("Work Data:", works);
    // gives description object where value is the description, gives subjects array kind of long though - maybe just use first, coverId, title, authors array - can just use first -- not always a cover so have to make sure that's there 
    // goal will be to be able to filter out the author and the subject (only gonna look at the first in the array)
    // then check for an image
    // then get everything and be able to pass down

    // have to work in useEffect
  } else {
    console.log("Could not find a book with a valid work key.");
  }
})();

  return (
    <>
    <h1>
      Find your next read!
    </h1>
    <p> Click through and see what books you find! </p>

    <button className='get-book-btn'> Get Book! </button>
    </>
  )
}

export default App
