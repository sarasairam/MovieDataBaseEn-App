import './index.css'

const CastItem = props => {
  const {data} = props
  const {profilePath, originalName, character} = data
  const url = `https://image.tmdb.org/t/p/w500${profilePath}`
  return (
    <div className="cast-card">
      <img src={url} alt={originalName} className="profile" />
      <p>Name: {originalName}</p>
      <p>Character: {character}</p>
    </div>
  )
}
export default CastItem
