const bodyParser=require("body-parser")
const express=require("express")
const mongoose=require("mongoose")
const path=require("path")
const exphbs=require("express-handlebars")
const app = express()


app.use(express.static('public'))


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/pictureswallet2", {
	useMongoClient: true

}).then(() => console.log("db is connected")).catch(err => console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



//////////////////////////////////////

app.get("/",function(req,res){
	res.render("home")
})



app.get('/login', function (req, res) {
  res.render('login')
})

app.get('/registrar', function (req, res) {
  res.render('registrar')
})

app.get('/informacion', function (req, res) {
  res.render('informacion')
})

app.get('/user', function (req, res) {
  res.render('user')
})















app.listen(3000, function(req, res){
	console.log("El servidor esta corriendo en el puerto 3000")
})