


document.addEventListener('DOMContentLoaded' , getPost);

// get Post
function getPost(){
    fetch('https://jsonplaceholder.typicode.com/posts').
    then((myPost) => myPost.json()).
    then((posts) => {
        
        // loop to extract object from the post 
        for(let elm of posts){
            // -------- length post --------- //
            // this condation for get little users 
            //if(elm.userId === 3) break ;        
           createPost(elm.userId , elm.id , elm.title );
        }

        
    });
};

// details user 
function detailsPost(id){
    fetch('https://jsonplaceholder.typicode.com/posts/'+ id).
    then((myPost) => myPost.json()).
    then((posts) => {
         // save to localStorage
         saveUser('post' , posts)
         location.href = 'resultUser.html';
    })
}

// create post 
function createPostUser(title , description , numId ){
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
    title: title ,
    body: description ,
    userId: numId
    }),
    headers: {
    "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then(response => response.json())
    .then(elm => {
        createPost(elm.userId , elm.id , elm.title );
        saveUser( 'obj', elm);
    })
    .catch(err => alert(err + " you can add again !"))
    }

// delete post 
function deletePost(id){
    fetch('https://jsonplaceholder.typicode.com/posts/'+ id , {
        method : 'DELETE'
    })
}



var table = document.getElementById('table-post');
table.addEventListener('click' , targetPost);

/* ------ important func  ---------*/

// create elment for post in table  
function createPost( userId , id , title){
  let parentElm = document.createElement('tr');

  parentElm.innerHTML = `
    <td>${userId}</td>
    <td>${id}</td>
    <td>${title}</td>
    <td><button class="btn-show">show</button></td>
    <td><img src="trash.svg" class="img"></td>
  `

  return table.appendChild(parentElm);
}

// this fun to target to click remove or show 
function targetPost(e){
   
   // parent target post  
   let parentPost = e.target.parentElement.parentElement ;

    // id post target 
    let userIdTarget = parentPost.children[1].innerHTML;

  // if target for icon delete 
  if(e.target.classList.contains('img')){ 
    // confirm for question delete or not 
    if(window.confirm('are you sure delete this post ?')){
      deletePost(userIdTarget);
      parentPost.remove();
    }else{
        return ;
    }
  }



  if(e.target.classList.contains('btn-show')){
    e.preventDefault();
    detailsPost(userIdTarget);

  }
   
}



// localeStorage because save the user add inside page
function saveUser(namePost , user){
    localStorage.setItem( namePost , JSON.stringify(user));
}




// ------------- event clicker ----------------

// add user btn 
let addUser = document.getElementById('insertUser');
// object input add user 
let inputs = {
    title: document.getElementById('title'),
    body: document.getElementById('body'),
    userID : document.getElementById('userID')
}


// methods pop-up adduser  / reset value and close 

function resetValue(){
    for(let i in inputs){
        inputs[i].value = "";
    }

    addUser.classList.add('d-none');

}

document.getElementById('close').addEventListener('click' , function (){
    resetValue();     
});


document.getElementById('newUser').addEventListener('click' , function (){
    addUser.classList.remove('d-none');
})


document.getElementById('save').addEventListener('click' , function (){

    // condation empty any inputs inside window add user 
    for(let i in inputs){
        if(inputs[i].value === ""){
            return alert('you have empty input !');
        }
    }

    
   // request name add user 
   createPostUser(
         inputs.title.value
       , inputs.body.value 
       , inputs.userID.value);


   resetValue();

  
});





