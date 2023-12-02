import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import CastItem from '../CastItem/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SingleMovie extends Component {
  state = {apiStatus: apiStatusConstants.initial, listA: [], listB: []}

  componentDidMount() {
    this.getData()
  }

  getFormattedData1 = data => {
    const each = data
    const update = {
      posterPath: each.poster_path,
      title: each.title,
      id: each.id,
      voteAverage: each.vote_average,
      runtime: each.runtime,
      releaseDate: each.release_date,
      overview: each.overview,
      genres: each.genres,
    }
    return update
  }

  getFormattedData2 = data => {
    const casted = data.cast
    const update = casted.map(each => ({
      profilePath: each.profile_path,
      originalName: each.original_name,
      character: each.character,
      castId: each.cast_id,
    }))
    return update
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl1 = `https://api.themoviedb.org/3/movie/${id}?api_key=8b580ca1ed146c7c7119a81c16859d0f&language=en-US`
    const apiUrl2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8b580ca1ed146c7c7119a81c16859d0f&language=en-US`
    const response1 = await fetch(apiUrl1)
    const response2 = await fetch(apiUrl2)
    if (response1.ok && response2.ok) {
      const fetchedData1 = await response1.json()
      const fetchedData2 = await response2.json()
      const updatedData1 = this.getFormattedData1(fetchedData1)
      const updatedData2 = this.getFormattedData2(fetchedData2)
      this.setState({
        apiStatus: apiStatusConstants.success,
        listA: updatedData1,
        listB: updatedData2,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
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
    const {listA, listB} = this.state
    const {
      title,
      posterPath,
      voteAverage,
      runtime,
      releaseDate,
      overview,
      genres,
    } = listA
    const url = `https://image.tmdb.org/t/p/w500${posterPath}`

    return (
      <div className="singlePage">
        <div className="movie-details">
          <h1>Movie Details</h1>
          <p>Title: {title}</p>
          <img src={url} alt={title} className="movie-poster" />
          <p>Over View: {overview}</p>
          <div className="row-single">
            <p>Rating: {voteAverage}</p>
            <p>Duration: {runtime} Mins</p>
            <p>Release Date: {releaseDate}</p>
          </div>
          <div className="row-singles">
            <p>Genres:</p>
            {genres.map(each => (
              <p>{each.name}</p>
            ))}
          </div>
        </div>
        <div className="details">
          <h1>Cast Details</h1>
          <div className="cast-details">
            {listB.map(each => (
              <CastItem key={each.castId} data={each} />
            ))}
          </div>
        </div>
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
    return <div className="main-container">{this.renderDataDetails()}</div>
  }
}

export default SingleMovie
