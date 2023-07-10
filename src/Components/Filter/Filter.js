import "./Filter.css";

export default function Filter(props) {
  return (
    <div className="filter">
      <div className="filter--names">
        <button
          className={`filter--button ${
            props.filter.options.includes("Ferramentas") && "active"
          }`}
          name="Ferramentas"
          onClick={props.handleClick}
        >
          Ferramentas
        </button>
        <button
          className={`filter--button ${
            props.filter.options.includes("Novidades") && "active"
          }`}
          name="Novidades"
          onClick={props.handleClick}
        >
          Novidades
        </button>
        <button
          className={`filter--button ${
            props.filter.options.includes("Dicas") && "active"
          }`}
          name="Dicas"
          onClick={props.handleClick}
        >
          Dicas
        </button>
        {props.admin && (
          <button
            className={`filter--manage ${
              props.filter.options.includes("manage") && "active"
            }`}
            name="manage"
            onClick={props.handleClick}
          >
            Manage
          </button>
        )}
      </div>
      <form className="filter--form">
        <input
          className="input-field"
          type="text"
          placeholder="Pesquisar..."
          name="article"
          value={props.filter.search}
          onChange={(event) =>
            props.setFilter((prevFilter) => ({
              ...prevFilter,
              search: event.target.value,
            }))
          }
        />
      </form>
    </div>
  );
}
