const editPostHandler = async () => {
    const title = document.querySelector('.post-title').value()
    const content = document.querySelector('.post-content').value()

    console.log(title)
    console.log(content)

}

document.querySelector('.edit-post-btn')
.addEventListener('click', editPostHandler)