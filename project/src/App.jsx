import { useState } from "react";
import "./App.css";
import MainItem from "./components/MainItem";
import SeenSoFar from "./components/SeenSoFar";
import BanList from "./components/BanList";

function App() {
  const getCoverImgUrl = (coverId, size = "M") => {
    if (!coverId) {
      return null;
    }

    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  const getAuthorName = (authorKeys) => {
    if (!authorKeys || authorKeys.length === 0) {
      return "Unknown Author";
    }
    return authorKeys[0];
  };

  const getSubjectName = (subjectKeys) => {
    if (subjectKeys && Array.isArray(subjectKeys) && subjectKeys.length > 0) {
      return subjectKeys[0];
    }

    return "No subjects listed";
  };

  const [mainItemProps, setMainItemProps] = useState({
    status: "empty",
    coverImg: "",
    title: "",
    author: "",
    subject: "",
    pub_year: "",
  });

  const getRandBook = async () => {
    const MAX_ATTEMPTS = 7;
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      try {
        const searchUrl = new URL("https://openlibrary.org/search.json");
        searchUrl.searchParams.append("q", "book");
        searchUrl.searchParams.append("sort", "random"); // get random results
        searchUrl.searchParams.append("limit", "50"); // limit to 50 results
        searchUrl.searchParams.append(
          "fields",
          "key, title, author_name, subject, first_publish_year, cover_i"
        ); // these are the specific fields we request

        console.log(`Attempting search: ${searchUrl.toString()}`);
        const res = await fetch(searchUrl.toString());

        if (!res.ok) {
          console.log("Search API error, trying another search...");
          continue;
        }
        const data = await res.json();
        const docs = data.docs;
        if (!docs || docs.length === 0) {
          console.log("no search results found. Retrying...");
          continue;
        }

        const potentialBooks = docs.filter(
          (doc) => doc.key && doc.key.startsWith("/works") && doc.cover_i
        );
        if (potentialBooks.length === 0) {
          console.log(`No works found. Retrying...`);
          continue;
        }

        const randomDoc =
          potentialBooks[Math.floor(Math.random() * potentialBooks.length)];
        const workId = randomDoc.key.split("/").pop();
        const coverId = randomDoc.cover_i;

        const pub_year = randomDoc.first_publish_year.toString() || "N/A";
        const title = randomDoc.title || "Untitled";
        const author = getAuthorName(randomDoc.author_name);
        const subject = getSubjectName(randomDoc.subject);

        const coverUrl = getCoverImgUrl(coverId, "M");

        console.log("workId : ", workId);
        console.log("title : ", title);
        console.log("author : ", author);
        console.log("subject: ", subject);
        console.log("coverUrl : ", coverUrl);
        console.log("pub_year: ", pub_year);

        setMainItemProps({
           status: "full",
           coverImg: coverUrl,
           title: title,
           author: author,
           subject: subject,
           pub_year: pub_year,
        });
        return;
      } catch (error) {
        console.error(`Error in getRandBook (attempt ${attempts}): `, error);

        //wait a bit before retrying after error
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
        continue;
      }
    }
    console.error("Failed to retrieve a random book");
    alert("Please try again.");
    setMainItemProps({
      status: "error",
      coverImg: "",
      title: "",
      author: "",
      subject: "",
      pub_year: "",
    });
    return;
  };



  return (
    <div className="app-container">
      <div className="header-section">
        <h1>Find your next read!</h1>
        <p> Click through and see what books you find! </p>
      </div>

      <div className="components-row">
        <SeenSoFar/>
        <MainItem 
          props={mainItemProps}
        />
        <BanList/>
      </div>

      <div className="button-container">
        <button className="get-book-btn" onClick={getRandBook}>
          Get Book!
        </button>
      </div>
    </div>
  );
}

export default App;
