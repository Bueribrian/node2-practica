const bodyParser=require("body-parser")
const express=require("express")
const mongoose=require("mongoose")
const path=require("path")
const exphbs=require("express-handlebars")
const app = express()
const passport=require("passport")
const flash= require("connect-flash")
const morgan= require("morgan")
const cookieParser=require("cookie-parser")
const session= require("express-session")

require("./config/passport")(passport)

app.use(express.static('public'))


app.set('views', path.join(__dirname,'views'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/pictureswallet2", {
	useMongoClient: true

}).then(() => console.log("db is connected")).catch(err => console.log(err))





//////////////////////////////////////




/////////////////////////////////////////////////
app.use(morgan("dev"))
app.use(cookieParser())
app.use(session({
	secret: '123456789',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

///////////////////////////////////////////////////

require('./app/routes')(app,passport)










app.listen(3000, function(req, res){
	console.log("El servidor esta corriendo en el puerto 3000")
})