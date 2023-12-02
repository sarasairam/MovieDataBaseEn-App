import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import HomePage from './components/HomePage'
import TopMovies from './components/TopMovies'
import UpComingMovies from './components/UpComingMovies'
import SingleMovie from './components/singlePage'
import NotFound from './components/NotFound'
import SearchMovie from './components/SearchMovie'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/top-rated" component={TopMovies} />
      <Route exact path="/upcoming" component={UpComingMovies} />
      <Route exact path="/single-movie/:id" component={SingleMovie} />
      <Route exact path="/search-movie/:name" component={SearchMovie} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
