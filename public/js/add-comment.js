const commentReset = document.getElementById('comment-reset');
const commentSubmitBtn = document.getElementById('comment-submit');
const commentBody = document.getElementById('comment_body');
const postID = document.getElementById('post-id').value;

// Reset comment text field
commentReset.addEventListener('click', (e) => {
    e.preventDefault();
    // Clear text 
    commentBody.value = "";
    // Disable submit button
    commentSubmitBtn.setAttribute("class", "pointer-events-none px-4 py-2 border bg-slate-200 border-emerald-400 hover:bg-emerald-400 transition duration-300");
})

// Enable comment submit button if comment input field is not empty
commentBody.addEventListener('keyup', () => {    
    if (commentBody.value == "") {        
        commentSubmitBtn.setAttribute("class", "pointer-events-none px-4 py-2 border bg-slate-200 border-emerald-400 hover:bg-emerald-400 transition duration-300")
    } else {
        commentSubmitBtn.setAttribute("class", "px-4 py-2 shadow-lg border border-emerald-400 hover:bg-emerald-300 active:shadow-sm transition duration-300");
    }
});

// Add comment to post
commentSubmitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/comments", {
            method: "POST",
            body: JSON.stringify({
                comment_body: commentBody.value,                
                post_id: postID,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        };
    } catch (err) {
        console.log(err);
    }
});


