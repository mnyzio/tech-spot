const postCancel = document.getElementById('post-cancel');
const postSaveBtn = document.getElementById('post-save');
const postTitle = document.getElementById('post_title'); 
const postBody = document.getElementById('post_body');
const editPostForm = document.getElementById('editPostForm');


// Reset comment text field
postCancel.addEventListener('click', (e) => {
    e.preventDefault();
    // Redirect to dashboard
    document.location.replace('/dashboard');
})

// Enable comment submit button if comment input field is not empty
editPostForm.addEventListener('keyup', () => {   
    if (postBody.value == "" || postTitle.value == "") {        
        postSaveBtn.setAttribute("class", "pointer-events-none px-4 py-2 border bg-slate-200 border-emerald-400 hover:bg-emerald-400 transition duration-300")
    } else {
        postSaveBtn.setAttribute("class", "px-4 py-2 shadow-lg border border-emerald-400 hover:bg-emerald-300 active:shadow-sm transition duration-300");
    }
});

// Update existing post
postSaveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const postID = document.getElementById('post-id').value;
        console.log("🚀 ~ file: edit-Post.js:29 ~ postSaveBtn.addEventListener ~ postID:", postID)
        
        console.warn("Button clicked")
        const response = await fetch("/posts/edit", {
            method: "PATCH",
            body: JSON.stringify({
                post_id: postID,
                post_title: postTitle.value,
                post_body: postBody.value,                                
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.warn("fetch complete")

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    } catch (err) {
        console.log(err);
    }
});