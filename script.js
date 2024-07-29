const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer');
const { getDirectories } = require('./public/js/helper')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')

// allowing express to serve all folders inside views as static pages
let public_path = path.join(__dirname, 'public')
app.use(express.static(public_path))
// getDirectories(public_path).forEach(view => app.use(express.static(path.join(views_path, view))))


// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// routes
app.get('/', (req, res) => {
    res.render('upload')
})

app.post('/upload-image', upload.single('image'), (req, res) => {
    res.send({...req.file})
})

app.get('/image/:slug', (req, res) => {
    const filename = req.params.slug
    res.render('image', {filename})
})


// throw Error("An Error Occured")
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next(err)
    }
    res.status(500)
    res.render('error', {error: err})
})


app.listen(3000)