{
    // function to submit the form data for new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    //console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);
                    // enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));
                    let noty = new Noty({
                        text: data.message,
                        type: 'success',
                        theme: 'bootstrap-v4',
                        timeout: 2000, // Set the notification duration (in milliseconds)
                    }).show();
                },error : function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    createPost();


    //method to create post in DOM
    let newPostDom = function(post){
        return $(`<div id="post-${ post._id }">
        <p>
                  <small>
                      <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                  </small> 
            <li>${ post.content }</li>
            <small>${ post.user.name }</small>
            <br>
            <small> 
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                         0 Likes
                    </a>
                            
            </small>
        </p>
        <div class = "post-comments"> 
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Add Comments" required>
                    <!-- sending post id of comments by Preplaced value -->
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Post Comment">
                </form> 
            <div class="post-comments-list">
                <ul id="post-comment-${ post._id }">  
                </ul>
            </div>
        </div>
    </div>`)
    }


    //Method to delete a post in dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    let noty = new Noty({
                        text: data.message,
                        type: 'success',
                        theme: 'bootstrap-v4',
                        timeout: 3000, // Set the notification duration (in milliseconds)
                    }).show();
                    $(`#post-${data.data.post_id}`).remove();
                   // console.log(data.data.post_id);
                }, error : function(err){
                    console.log(err.responseText);
                }
            })
        })
    }


    // Function to enable AJAX deletion for existing posts
    function enableAjaxDeletionForExistingPosts() {
        $('.delete-post-button').click(function (e) {
            e.preventDefault();
            deletePost(this);
        });
    }
    
    // Call the function to enable AJAX deletion for existing posts
    enableAjaxDeletionForExistingPosts();
 
}