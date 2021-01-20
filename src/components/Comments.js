
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {Table,Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Comments.css'
import { fetchComment } from '../redux/actions/commentsActions';
function Comments(props) {

    const {userId} = useParams();
    const [editId,setEditId] = useState(0)
    const [name,setName] = useState('');
    const [body,setBody] = useState('');
    const [showModal,setShowModal] = useState(false)

    const handleEditInfo = (id,name,body) => {
        setEditId(id)
        setName(name)
        setBody(body)
        setShowModal((prevState)=>!prevState)
    }
    const editInfo =e => {
        e.preventDefault();
        console.log("editId------>",editId)
        props.onEditInfo(editId,name,body)
        setShowModal((prevState)=>!prevState)

    }
    useEffect(() => {
        if(userId) {
            props.fetchComment(userId)
        }
    }, [userId])

    return (
        <div>
        

        <div className={showModal?"comment_editbox":" comment_editbox active"} >
            <h2>Edit information</h2>
                    <form >
                    <h5>Id</h5>
                        <input value ={editId} placeholder=""
                        contentEditable={false}
                        type="text" />
                        <h5>Title</h5>
                        <input value ={name} placeholder="edit title"
                        onChange={e=>setName(e.target.value) }
                        type="text" />
                        <h5>Body</h5>
                        <input value={body} placeholder="edit body"
                        onChange={e=>setBody(e.target.value) }
                        type="text" />
                        <button
                        type="submit"
                        onClick={editInfo}
                        className="comment_editbox_regbtnn">Edit Information</button>
                    </form>  
          </div> 
          {!props.isLogin ?  <div className="home_alert">
                <h1>You need to be logged In to view this page</h1>
                {/* {console.log(posts)} */}
            </div>:<div className="post_tableBox">
            <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>Title</th>
                <th>Post Id</th>
                <th>Description</th>
                <th>action</th>
                <th>action</th>
            </tr>
            </thead>
            <tbody>
                {props.comments.map((post,index) =>(
                     <tr key={index}>
                         
                    <td >{post.id}</td>
                    <td>{post.name}</td>
                    <td>{post.postId}</td>
                    <td>{post.body}</td>
                    
                    <td><Button onClick={()=>handleEditInfo(post.id,post.name,post.body)}>edit</Button></td>
                    <td><Button onClick={()=>props.onDelete(post.id)}>delete</Button></td>
                
                  </tr>
                ) )}
            </tbody>
            </Table>
            </div>
}

            </div>
            
    )
}

const mapStateToProps = state => {
    return {
        comments: state.comments.comments,
        isLogin: state.signUp.isLogin
    }
}
const mapDispatchToProps = dispatch => {
    return {
         onDelete: (id) => dispatch({type: 'DELETE',value:id}),
        fetchComment: (userId) => dispatch(fetchComment(userId)),
        onEditInfo: (id,name,body) => dispatch({type:'EDIT_COMMENT',value:{'id':id,'name':name,'body':body}})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Comments);
