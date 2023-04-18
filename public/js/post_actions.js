const editBtn = document.querySelectorAll('.post-btn-edit');
const deleteBtn = document.querySelectorAll('.post-btn-delete');

editBtn.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        try {
            const postID = btn.dataset.postid;            
            alert(`Clicked ${postID} buton`);
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
            console.log("🚀 ~ file: post_actions.js:19 ~ btn.addEventListener ~ postID:", postID)
            
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

document.addEventListener('click', (e) => {
    console.log(e.target);
})
