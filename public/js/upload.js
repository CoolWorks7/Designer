let uploader = document.querySelector('.uploader')
let fileSelector = document.querySelector('#file-selector')
let uploadSection = document.querySelector('.upload-image-section')
let previewSection = document.querySelector('.preview-image-section')

function showPreviewImage(img, file) {
    uploadSection.style.display = 'none'
    previewSection.style.display = 'flex'
    let imgContainer = previewSection.querySelector('.img-container')
    imgContainer.style.background = `url("${img}")`
    imgContainer.style.backgroundPosition = 'center'
    imgContainer.style.backgroundRepeat = 'no-repeat'
    imgContainer.style.backgroundSize = 'contain'

    previewSection.querySelector('.upload-btn').onclick = () => uploadImage(file)
    previewSection.querySelector('.cancel-btn').onclick = () => hidePreviewImage()
}

function hidePreviewImage() {
    uploadSection.style.display = 'flex'
    previewSection.style.display = 'none'
}




uploader.addEventListener('mouseover', () => overUploader(false))
uploader.addEventListener('mouseleave', () => notOverUploader(false))
uploader.addEventListener('drop', (e) => {
    e.preventDefault()
    notOverUploader()
    
    let file = e.dataTransfer.files[0]
    processImage(file)
})
uploader.addEventListener('dragover', (e) => {
    e.preventDefault()
    overUploader()
})
uploader.addEventListener('dragleave', (e) => {
    e.preventDefault()
    notOverUploader()
})

fileSelector.addEventListener('input', () => {
    let file = fileSelector.files[0]
    processImage(file)
})


function overUploader(overlay=true) {
    if (overlay) uploader.querySelector('.overlay').style.clipPath = 'circle(100% at 50% 50%)'
    uploader.querySelector('svg path.arrow').style.transform = 'translateY(-10%)'
}

function notOverUploader(overlay=true) {
    if (overlay) uploader.querySelector('.overlay').style.clipPath = 'circle(0% at 50% 50%)'
    uploader.querySelector('svg path.arrow').style.transform = 'translateY(0%)'
}

function processImage(file) {
    let supportedFiles = ['image/jpeg', 'image/png']
    if (!supportedFiles.includes(file.type)) return customError("Error....")

    let img = new FileReader()
    img.onloadend = (e) => showPreviewImage(e.target.result, file)
    img.readAsDataURL(file)
}

function uploadImage(file) {
    let formData = new FormData()
    formData.append('image', file)
    
    fetch('/upload-image', {
        method: 'POST',
        body: formData
    })
    .then((res) => res.json())
    .then(({filename}) => {
        location.href = `image/${filename}`
        fileSelector.value = null
    })
}


