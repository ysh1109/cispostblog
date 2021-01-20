import React,{useEffect,useState} from 'react'
import './Home.css'
import {Table,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {fetchPost} from '../redux/actions/postsActions'
import { Link,useHistory } from 'react-router-dom';



function Home(props) {
    const history = useHistory()
    const [like,setLike] = useState(false)
    const [editId,setEditId] = useState(0)
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [showModal,setShowModal] = useState(false)

   
    useEffect(()=>{
        props.fetchPost()
    },[])

    const handleEditInfo = (id,title,body) => {
        setEditId(id)
        setTitle(title)
        setBody(body)
        setShowModal((prevState)=>!prevState)
    }
    const editInfo =e => {
        e.preventDefault();
        props.onEditInfo(editId,title,body)
        setShowModal((prevState)=>!prevState)

    }
    const handlePost =(userId) => {
        history.push(`/posts/${userId}`);
    }

    const likeHandler = () => {
        setLike(prevState=>!prevState)
    }
    return (
        <div className="home">
           

          <div className={showModal?"home_editbox":" home_editbox active"} >
            <h2>Edit information</h2>
                    <form >
                    <h5>Id</h5>
                        <input value ={editId} placeholder=""
                        contentEditable={false}
                        type="text" />
                        <h5>Title</h5>
                        <input value ={title} placeholder="edit title"
                        onChange={e=>setTitle(e.target.value) }
                        type="text" />
                        <h5>Body</h5>
                        <input value={body} placeholder="edit body"
                        onChange={e=>setBody(e.target.value) }
                        type="text" />
                        <button
                        type="submit"
                        onClick={editInfo}
                        className="home_editbox_regbtnn">Edit Information</button>
                    </form>  
          </div> 

        {!props.isLogin ?  <div className="home_alert">
                <h1>You need to be logged In to view this page</h1>
                {/* {console.log(posts)} */}
            </div>:
            <div className="home_tableBox">
            <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>Title</th>
                <th>Description</th>
                <th>action</th>
                <th>action</th>
                <th>action</th>
            </tr>
            </thead>
            <tbody>
                {console.log(props.posts)}
                {props.posts?
 
                props.posts.map((post,index) =>(
                     <tr key={index}>
                         
                    <td style={{cursor:'pointer'}} onClick={()=>handlePost(post.userId)}>{post.id}</td>
                    <td style={{cursor:'pointer'}} onClick={()=>handlePost(post.userId)}>{post.title}</td>
                    <td  style={{cursor:'pointer'}} onClick={()=>handlePost(post.userId)}>{post.body}</td>
                    <td><Button onClick={()=>handleEditInfo(post.id,post.title,post.body)}>edit</Button></td>
                    <td><Button onClick={()=>props.onDelete(post.id)}>delete</Button></td>
                    <td><Button onClick={()=>likeHandler()}>{like?'like':'liked'}</Button></td>
                
                  </tr>
                ) )
                : <h1>loading</h1>}
            </tbody>
            </Table>
            </div>
                        }

                    
                        
                    </div>
                )
}



const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        isLogin: state.signUp.isLogin
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => dispatch({type: 'DELETE',value:id}),
        fetchPost: () => dispatch(fetchPost()),
        onEditInfo: (id,title,body) => dispatch({type:'EDIT',value:{'id':id,'title':title,'body':body}})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);
// export default Home;
