import { useState } from 'react'
import './App.css';

function App() {
  const getCoverImgUrl = (coverId, size = 'M') => {
    if (!coverId) {
      return null;
    }

    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }

  const getAuthorName = (authorKeys) => {
    if (!authorKeys || authorKeys.length === 0) {
      return "Unknown Author";
    }
    return authorKeys[0]
  }

  const getRandBook = async () => {
    const MAX_ATTEMPTS = 5;
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      try {
        const searchUrl = new URL("https://openlibrary.org/search.json");
        searchUrl.searchParams.append("q", "book"); 
        searchUrl.searchParams.append("sort", "random"); // get random results
        searchUrl.searchParams.append("limit", "50") // limit to 50 results
        searchUrl.searchParams.append("fields", "key, title, author_name, subject, first_publish_year, cover_i, description") // these are the specific fields we request

        console.log(`Attempting search: ${searchUrl.toString()}`);
        const res = await fetch(searchUrl.toString());

        if (!res.ok) {
          console.log("Search API error, trying another search...");
          continue;
        }
        const data = await res.json();
        const docs = data.docs;
        if (!docs || docs.length === 0) {
          console.log("no search results found. Retrying...")
          continue;
        }

        const potentialBooks = docs.filter(doc => 
          doc.key && doc.key.startsWith('/works') && doc.cover_i
        );
        if (potentialBooks.length === 0) {
          console.log(`No works found. Retrying...`);
        }

        const randomDoc = potentialBooks[Math.floor(Math.random() * potentialBooks.length)];
        const workId = randomDoc.key.split('/').pop();
        const coverId = randomDoc.cover_i;

        const title = randomDoc.title || 'Untitled'
        const author = getAuthorName(randomDoc.author_name)
        const subjects = randomDoc.subject || [];

        let description = randomDoc.description;
        if (description && typeof description === 'object' && description.value) {
          description = description.value;
        } else if (!description) {
          description = "No description available."
        }

        const coverUrl = getCoverImgUrl(coverId, 'M');
        return {
          workId : workId,
          title: title,
          author: author,
          subjects: subjects,
          description: description,
          coverUrl: coverUrl,
        };

      } catch (error) {
        console.error(`Error in getRandomBookData (attempt ${attempts}): `, error);
        
        //wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        continue;
      }
    } 
    console.error("Failed to retrieve a random book");
    alert("Please try again.");
    return null;

  }

  return (
    <>
    <h1>
      Find your next read!
    </h1>
    <p> Click through and see what books you find! </p>

    <button className='get-book-btn' onClick={getRandWorkAndImage}> Get Book! </button>
    </>
  )
}

export default App;
