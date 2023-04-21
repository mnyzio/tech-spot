const editBtn = document.querySelectorAll('.post-btn-edit');
const deleteBtn = document.querySelectorAll('.post-btn-delete');

editBtn.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        try {
            const postID = btn.dataset.postid;            
                        
            document.location.replace(`/posts/edit/${postID}`)
            
        } catch (err) {
            console.log(err);
        }
    });
});

// Handle post delete
deleteBtn.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        try {
            const postID = btn.dataset.postid;
            
            const response = await fetch(`/posts/${postID}`, {
                method: "DELETE",
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert("Post not deleted");
            }
        } catch (err) {
            console.log(err);
        };
    });
});

