import React, { useState, useEffect } from "react";
import { Form, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../../store/actions/movies.actions";

import styles from "./Search.module.css";

function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { filteredMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (search.length >= 1) {
      dispatch(searchMovies(search));
    }
  }, [search]);

  return (
    <div className="d-inline-block">
      <Form.Control
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search movies or events..."
        id="search__input"
        className={styles.search__input}
        autoFocus={true}
        autoComplete={"off"}
      />
      {search.length > 0 ? (
        filteredMovies.length > 0 ? (
          <ul id="search__movies-list" className={styles.search__movies_list}>
            {filteredMovies.map((list) => (
              <li
                key={`movie-${list.id}`}
                onClick={() => {
                  setSearch("");
                  navigate(`/movies/${list.id}`);
                }}
                className={
                  "d-flex justify-content-start align-items-start flex-row"
                }
              >
                <div style={{ height: "40px" }} className="pe-1">
                  <Image
                    src={list.image}
                    alt={`${list.title} image`}
                    height={40}
                  />
                </div>
                <div>
                  <p className={styles.search__movieTitle}>{list.title}</p>
                  <span className={styles.search__movieGenre}>
                    {list.genre}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul id="search__movies-list" className={styles.search__movies_list}>
            <li>No movies</li>
          </ul>
        )
      ) : null}
    </div>
  );
}

export default Search;
