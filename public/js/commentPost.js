const createCommentHandler = async (event) => {
    console.log('comment handler')
    event.preventDefault();

    const content = document.querySelector('input[name="comment-body"]').value.trim();
    console.log(content)
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                content
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

document.querySelector('.comment-form')
    .addEventListener('submit', createCommentHandler);