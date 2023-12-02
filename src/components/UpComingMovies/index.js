import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem/index'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UpComingMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, list: [], page: 1}

  componentDidMount() {
    this.getData()
  }

  getFormattedData = data => {
    const update = data.map(each => ({
      posterPath: each.poster_path,
      title: each.title,
      id: each.id,
      voteAverage: each.vote_average,
    }))
    return update
  }

  getData = async () => {
    const {page} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=8b580ca1ed146c7c7119a81c16859d0f&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.results)
      this.setState({apiStatus: apiStatusConstants.success, list: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  nextButton = () => {
    this.setState(prevState => ({page: prevState.page + 1}), this.getData)
  }

  prevButton = () => {
    const {page} = this.state
    if (page > 1) {
      this.setState(prevState => ({page: prevState.page - 1}), this.getData)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1>Product Not Found</h1>
    </div>
  )

  displayView = () => {
    const {list} = this.state

    return (
      <div className="homePage">
        {list.map(each => (
          <MovieItem key={each.id} data={each} />
        ))}
      </div>
    )
  }

  renderDataDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.displayView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {page} = this.state
    return (
      <div className="main-container">
        <div className="homePage1">
          <div className="buttons-container">
            <button type="button" className="button" onClick={this.prevButton}>
              Prev
            </button>
            <p className="para">{page}</p>
            <button type="button" className="button" onClick={this.nextButton}>
              Next
            </button>
          </div>
          {this.renderDataDetails()}
        </div>
      </div>
    )
  }
}

export default UpComingMovies
