import "./SingleCard.css";
import ConditionalLink from "../ConditionalLink";
import { Link } from "react-router-dom";
import { app, database } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default function SingleCard(props) {
  function deletePost() {
    deleteDoc(doc(database, "posts", props.item.id))
      .then(() => {
        alert(`Post deleted successfully`)
        props.getData();
      })
      .catch((err) => alert(err.message));
  }

  const edit = (
    <div className="card--admin-view-icons">
      <img
        className="card--edit-icon"
        src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
        alt="delete"
        onClick={deletePost}
      />
      <Link to={`/blog/${props.item.id}`} state={{ edit: props.adminView }}>
        <img
          className="card--edit-icon"
          src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
          alt="edit"
        />
      </Link>
    </div>
  );

  const segments = props.item.segments.join(", ");

  return (
    <ConditionalLink
      className="full-card"
      to={`/blog/${props.item.id}`}
      condition={!props.adminView}
    >
      {props.adminView && edit}
      <div className="card" style={props.adminView ? { opacity: 0.56 } : {}}>
        <img
          src={props.item.coverImage}
          alt={props.item.title}
          className="card--image"
        />
        <div className="card--info">
          <h2 className="card--title">{props.item.title}</h2>
          <h4 className="card--segment">{segments}</h4>
          <p className="card--description">{props.item.description}</p>
        </div>
      </div>
    </ConditionalLink>
  );
}
