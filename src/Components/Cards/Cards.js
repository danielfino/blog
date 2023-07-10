import SingleCard from "../SingleCard/SingleCard";
import "./Cards.css";
import hardCodedData from "../../data.js";
import { useEffect, useState } from "react";
import { app, database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Filter from "../Filter/Filter";
import { useLocation } from "react-router-dom";

function Cards(props) {
  const [adminView, setAdminView] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ options: [], search: "" });
  const dbInstance = collection(database, "posts");

  async function getData() {
    const data = await getDocs(dbInstance);
    setPosts(data.docs.map((item) => ({ ...item.data(), id: item.id })));
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(posts);

  useEffect(() => {
    setAdminView(filter.options.includes("manage"));
  }, [filter]);

  function handleClick(event) {
    function toggleFilter(array, filterName) {
      if (array.includes(filterName)) {
        return array.filter((c) => {
          return c !== filterName;
        });
      } else {
        return [...array, filterName];
      }
    }
    setFilter((prevFilter) => ({
      ...prevFilter,
      options: toggleFilter(prevFilter.options, event.target.name),
    }));
  }

  function filterSearch(posts) {
    let newPosts = posts;
    // Checks if manage filter is active
    if (!filter.options.includes("manage") && filter.options.length > 0) {
      newPosts = posts.filter((post) =>
        post.segments.some((cat) => filter.options.includes(cat))
      );
    }

    // Checks what default filters are active
    return newPosts.filter((post) => {
      const postInfo = [post.title, ...post.segments];
      return postInfo.some((elem) =>
        elem.toLowerCase().includes(filter.search.toLowerCase())
      );
    });
  }

  const filteredPosts = filterSearch(posts);
  console.log(filteredPosts);

  const cards = filteredPosts.map((elem) => (
    <SingleCard key={elem.id} item={elem} getData={getData} adminView={adminView} />
  ));

  // tirar isto e meter no set
  if (adminView) {
    cards.unshift(
      <SingleCard
        key={"create"}
        item={{
          id: "create",
          title: "Create Post",
          coverImage:
            "https://storage.needpix.com/rsynced_images/instagram-3814061_1280.png",
          segments: [],
        }}
      />
    );
  }

  return (
    <div className="posts">
      <Filter
        admin={props.admin}
        filter={filter}
        setFilter={setFilter}
        handleClick={handleClick}
      />
      <div className="cards">{cards}</div>
    </div>
  );
}

export default Cards;
