import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AppContextProvider } from './context/context'
import Layout from './components/Layout'
import Feed from './components/Feed'
import VideoDetail from './components/VideoDetail'
import SearchResult from './components/SearchResult'




function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Feed />} />
        <Route path='searchResult'>
          <Route path=':searchQuery' element={<SearchResult />} />
        </Route>
        <Route path='video'>
          <Route path=':videoId' element={<VideoDetail />} />
        </Route>
      </Route>
    )
  )


  return (
    <>
      <AppContextProvider>
        <div className='flex flex-col h-full'>
          <RouterProvider router={router} />
        </div>
      </AppContextProvider>
    </>
  )
}

export default App;
