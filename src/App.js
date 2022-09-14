
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'

import {Route, Switch,useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {format} from 'date-fns'

function App() {
  const [posts,setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [search,setSearch] = useState('')
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [searchResult,setSearchResult] = useState([])
  const history = useHistory()

  useEffect(()=>{
    const filteredResults = posts.filter(post=>((post.body).toLowerCase()).includes(search.toLowerCase())||
    ((post.title).toLowerCase()).includes(search.toLowerCase()))

    

    setSearchResult(filteredResults.reverse())
  },[posts,search])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length-1].id + 1 : 1
    const datetime = format(new Date(),'MMMM dd, yyyy pp')
    const newPost = {id, title:postTitle,datetime,body:postBody}

    const allPost = [...posts,newPost]

    setPosts(allPost)
    setPostTitle = ''
    setPostBody = ''
    history.push('/')
  }

  const handleDelete = (id) =>{
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    history.push('/')
  }
  return (
    <div className="App">
      <Header title='React JS Blog' />
      <Nav search = {search}
            setSearch = {setSearch}
      />
      <Switch>
        <Route path='/'>
          <Home posts = {searchResult}/>
        </Route>
        <Route path='/post'>
          <NewPost 
            handleSubmit = {handleSubmit}
            postTitle = {setPostTitle}
            setPostTitle = {setPostTitle}
            postBody = {postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path='/post/:id'>
          <PostPage 
            posts = {posts}
            handleDelete ={handleDelete}
          />
        </Route>
        <Route path='/about' component={About}></Route>
        <Route path='*' component={Missing}></Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
