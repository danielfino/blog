import React, { useEffect, useState } from "react";
import { app, database } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import moment from "moment";

import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import data from "../../data";
import Select from "react-select";
import "./Post.css";
import Filter from "../Filter/Filter";

function Post(props) {
  const { postId } = useParams();
  const dbInstance = collection(database, "posts");

  const location = useLocation();
  let edit = location?.state?.edit || props.create;
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ options: [], search: "" });
  const [defSegments, setDefSegments] = useState();
  const [post, setPost] = useState(data.data.posts[0]);

  const fetchPost = async () => {
    if (props.create) {
      const newPost = {
          id: nanoid(),
          title: "Title",
          coverImage:
              "https://digitalhub.fifa.com/transform/a006f50e-5828-4d85-a610-d8031be8b398/Portugal-v-Uruguay-Group-H-FIFA-World-Cup-Qatar-2022",
          segments: ["Novidades"],
          description: "Descrição",
          date: moment().format("MM/DD/YYYY"),
          body: "Write your text here...",
          postImage:
              "https://www.pixelstalk.net/wp-content/uploads/2016/08/Cool-Photography-Backgrounds-Free-Download.jpg",
      };
      setPost(newPost);
      return;
    }

    await getDocs(dbInstance).then((querySnapshot) => {
      const foundPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filterPost = foundPosts.find((post) => post.id === postId);

      setPost(filterPost);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    setDefSegments(
      post.segments.map((elem) => ({
        value: elem,
        label: elem,
      }))
    );
  }, [post]);

  console.log(post);
  console.log(defSegments);

  if (!post) {
    // outra mensagem a dizer que nao encontra o artigo
    return <Navigate to="/blog" />;
  }

  function handleFilter(event) {
    navigate("/blog", { state: { event: event } });
  }

  function editPost(event, action) {
    function toggleFilter(array, filterName) {
      if (array.includes(filterName)) {
        return array.filter((c) => {
          return c !== filterName;
        });
      } else {
        return [...array, filterName];
      }
    }

    const { name, value, files, type } = event.target ? event.target : action;
    setPost((prevPost) => ({
      ...prevPost,
      [name]:
        type === "file"
          ? files[0]
          : event.target
          ? value
          : toggleFilter(
              post.segments,
              action.option ? action.option.value : action.removedValue.value
            ),
    }));
  }

  function submitPost() {
    props.create
      ? addDoc(dbInstance, post)
          .then(() => alert(`Post ${post} created!`))
          .catch((err) => alert(err.message))
      : updateDoc(doc(database, "posts", post.id), post)
          .then(() => alert(`Post updated successfully`))
          .catch((err) => alert(err.message));

    navigate("/blog");
  }

  // hard-coded depois tirar isto pelos filtros que existem
  const options = [
    { value: "Ferramentas", label: "Ferramentas" },
    { value: "Dicas", label: "Dicas" },
    { value: "Novidades", label: "Novidades" },
  ];

  const defaultValues = post.segments.map((segment) => ({
    value: segment,
    label: segment,
  }));

  const segments = post.segments.join(", ");

  return (
    <div>
      <Filter
        admin={props.admin}
        filter={filter}
        setFilter={setFilter}
        handleClick={handleFilter}
      />

      <div className="post">
        <img
          className="post-image"
          src={
            post.postImage?.type?.split("/")[0] === "image"
              ? URL.createObjectURL(post.postImage)
              : post.postImage
          }
          alt={post.title}
        />
        {edit && (
          <input
            type="file"
            className="selectImage"
            name="postImage"
            onChange={editPost}
          />
        )}

        <div className="post-info">
          {edit ? (
            <>
              {/* <Select
                className="post-info-option"
                name="segments"
                options={options}
                defaultValue={defaultValues}
                isMulti
                onChange={editPost}
              /> */}
            </>
          ) : (
            <>
              <h4 className="post-info-option">{segments}</h4>
            </>
          )}
          <h4 className="post-info-option">{post.date}</h4>
        </div>

        {edit ? (
          <>
            <input
              type="text"
              className="post-title"
              name="title"
              placeholder="Title goes here"
              value={post.title}
              onChange={editPost}
            />
            <textarea
              value={post.body}
              className="post-body post-body-area"
              name="body"
              placeholder="Body"
              onChange={editPost}
            />
          </>
        ) : (
          <>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-body">{post.body}</p>
          </>
        )}

        {edit && (
          <button className="post-submit" onClick={submitPost}>
            Submit changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
