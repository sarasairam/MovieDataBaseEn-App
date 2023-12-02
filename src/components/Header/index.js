import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {data: ''}

  updateData = event => {
    this.setState({data: event.target.value})
  }

  render() {
    const {data} = this.state

    return (
      <nav className="nav-header">
        <div className="blog-container">
          <h1 className="blog-title">movieDB</h1>
          <div>
            <input
              className="search-bar"
              type="search"
              value={data}
              onChange={this.updateData}
            />
            <Link to={`/search-movie/${data}`}>
              <button className="search-button" type="button">
                Search
              </button>
            </Link>
          </div>
          <ul className="nav-menu">
            <Link className="nav-link" to="/">
              <li>Popular</li>
            </Link>
            <Link className="nav-link" to="/top-rated">
              <li>Top Rated</li>
            </Link>
            <Link className="nav-link" to="/upcoming">
              <li>Upcoming</li>
            </Link>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
