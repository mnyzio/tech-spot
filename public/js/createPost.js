const postReset = document.getElementById('post-reset');
const postCancel = document.getElementById('post-cancel');
const postSubmitBtn = document.getElementById('post-submit');
const postTitle = document.getElementById('post_title'); 
const postBody = document.getElementById('post_body');
const newPostForm = document.getElementById('newPostForm');

// Cancel new post
postCancel.addEventListener('click', (e) => {
    e.preventDefault();    
    // Redirect to dashboard
    document.location.replace('/dashboard');
});


// Reset comment text field
postReset.addEventListener('click', (e) => {
    e.preventDefault();
    // Clear text 
    postTitle.value = "";
    postBody.value = "";
    // Disable submit button
    postSubmitBtn.setAttribute("class", "pointer-events-none px-4 py-2 border bg-slate-200 border-emerald-400 hover:bg-emerald-400 transition duration-300");
})

// Enable comment submit button if comment input field is not empty
newPostForm.addEventListener('keyup', () => {   
    if (postBody.value == "" || postTitle.value == "") {        
        postSubmitBtn.setAttribute("class", "pointer-events-none px-4 py-2 border bg-slate-200 border-emerald-400 hover:bg-emerald-400 transition duration-300")
    } else {
        postSubmitBtn.setAttribute("class", "px-4 py-2 shadow-lg border border-emerald-400 hover:bg-emerald-300 active:shadow-sm transition duration-300");
    }
});

// Add comment to post
postSubmitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/posts/create", {
            method: "POST",
            body: JSON.stringify({
                post_title: postTitle.value,
                post_body: postBody.value,                                
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        };
    } catch (err) {
        console.log(err);
    }
});