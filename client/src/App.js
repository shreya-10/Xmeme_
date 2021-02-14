import {React,useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
<style>
@import url('https://fonts.googleapis.com/css2?family=Benne&display=swap');
</style>

const App=()=> {

const  [name,setname]=useState("");
const  [caption,setcaption]=useState("");
const  [url,seturl]=useState("");
const  [postlist,setpostlist]=useState([]);
// const newarray = postlist.slice().reverse();
const addPost=()=>{
  axios.post("http://localhost:8081/memes",{name: name,caption:caption,url:url}).then(()=>{
      
    alert("Meme posted succesfully");
    
  }).catch(()=>{
alert("Meme waas not posted");
  });
}

const editPost=(id,nam)=>{
  const new_url = prompt("enter new meme-url!");
  const new_caption=prompt("enter new caption!");
  const new_name=nam;
axios.put("http://localhost:8081/memes/${id}",{new_name: new_name,new_url: new_url,new_caption:new_caption, id: id}).then(()=>{
  setpostlist(postlist.map((val)=>{
    return val._id==id ? {_id:id,name:new_name,caption:new_caption,url:new_url}:val;
  }))
});

};




const deletePost=(id)=>{
  axios.delete("http://localhost:8081/delete/${id}").then((req,res)=>{
    setpostlist(postlist.filter((val)=>{
      return val._id != id;
    }));
    
  });
}

useEffect(()=>{
axios.get("http://localhost:8081/memes").then((response)=>{
  setpostlist(response.data);
}).catch(()=>{
  console.log("cannot read data");
});

},[]);



  return (
    <div className="main__container">
    <div>
     <span> <img id="icon" src="https://img.icons8.com/ios-filled/50/fa314a/xbox-x.png"/></span>
     <span id="title">Meme</span>
     </div>
      <form className="meme__form" onSubmit={addPost}>
        <h1>Post your Meme</h1>
      <input type="text"  className="input__field" value={name}  placeholder="Enter Your Name"  onChange={(e)=>setname(e.target.value)} ></input>
      <input type="text"  value={caption}   className="input__field" placeholder="Enter The Caption" onChange={(e)=>setcaption(e.target.value)}></input>

      <input type="text" value={url}  className="input__field" placeholder="Enter the Meme URL" onChange={(e)=>seturl(e.target.value)}></input>

      <button type="submit" id="create__button">Create Meme</button>


      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Enjoy the Meme Colection</h1>
      
      <div className="meme__row">
        {postlist.map((val,index)=>{
          return <div className="row__item" key={val._id}>      
          <img className="meme__img" src={`${val.url}`}></img>
          <p id="caption"> {val.caption}</p>
          <div className="footer">
          <span>- {val.name}</span>
            <button  onClick={()=>editPost(val._id,val.name)}  className="edit-button">Edit</button>
            <button  onClick={()=>deletePost(val._id,val.name)}  className="delete-button">Delete</button>
          
          </div>
          </div>
        })}
        

      </div>
     
    </div>
  );
}

export default App;
