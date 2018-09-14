import React, { Component } from "react";

import axios from "axios";

import "./Home.css";

const API_KEY = "736cb0f2a5061149d7b43012b1dada7e";

class Home extends Component {
  state = {
    search: "",
    results: null
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ search: e.target.value });
    const search = this.state.search;

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
      )
      .then(res => this.setState({ results: res.data.results }))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.results);
    return (
      <div className="Home">
        <div className="Nav">
          <h3>BryanDb</h3>
          <div className="Navigation">
            <form onChange={this.onChange}>
              <input type="text" placeholder="Type Movie Name Here" />
            </form>
          </div>
        </div>
        <div className="results">
          {this.state.results
            ? this.state.results
                .filter(par => par.poster_path !== null)
                .map(res => {
                  return (
                    <div
                      className="result"
                      style={{
                        background: `url('http://image.tmdb.org/t/p/w500/${
                          res.poster_path
                        }')`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0 5"
                      }}
                      key={res.id}
                    >
                      <div className="innerText">
                        <h3>{res.title}</h3>
                        <h4>
                          {res.overview.substring(0, 250)}
                          ...
                        </h4>{" "}
                        <div className="buttons">
                          <a
                            href={`https://www.themoviedb.org/movie/${res.id}`}
                            target="_blank"
                          >
                            <h5>More Info</h5>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
            : null}
        </div>
        <div className="Results" />
      </div>
    );
  }
}

export default Home;
