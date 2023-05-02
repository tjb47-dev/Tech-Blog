const newFormHandler = async (event) => {
    console.log('submit new post')
    event.preventDefault();

    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();

    if (name && description) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/posts');
        } else {
            alert('Failed to create post');
        }
    }
};

const delButtonHandler = async (event) => {
    console.log('delete button clicked')
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete project');
        }
    }
};

const createCommentHandler = async (event) => {
    console.log('comment handler')
    event.preventDefault();

    const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
    console.log(comment_text)
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('comment posted')
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
}

document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.delete-post-btn')
    .addEventListener('click', delButtonHandler);

document.querySelector('.comment-form')
    .addEventListener('submit', createCommentHandler);