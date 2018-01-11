module.exports = (app, passport) =>{
const cloudinary=require("cloudinary")
const Product=require("./models/product")
var multer  = require('multer')
const path=require("path")
app.get("/",function(req,res){
	
  res.render("home")
})
//////////////Login////////////////////
app.get('/login', function (req, res) {
  res.render('login',{
  	message: req.flash("loginMessage")
  })
})

app.post('/login', passport.authenticate('local-login',{
  successRedirect: '/profile',
  failureRedirect:'/login',
  failureFlash: true,
}))
///////////////Registro///////////////////
app.get('/registrar', function (req, res) {
  res.render('registrar',{
    message: req.flash("signup message")
  })
})

app.post('/registrar', passport.authenticate('local-signup',{
	successRedirect: '/user',
	failureRedirect:'/registrar',
	failureFlash: true,
}))

////////////////Informacion////////////////////
app.get('/informacion', function (req, res) {
  res.render('informacion')
})


///////////////Usuario////////////////
app.get('/user', function (req, res) {
  res.render('user',{
  	user: req.user
  })
})

app.get('/profile'), function(req,res){
  res.render('profile')
}

/////////////Subir archivo////////////////
const storage=multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  }
})
const upload=multer({
  storage: storage,
  limits:{fileSize:4000000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

function checkFileType(file, cb){
  // Allowed ext
  const filestypes=/jpeg|jpg|png|gif/;
// check ext
const extname=filestypes.test(path.extname(file.originalname).toLowerCase());
const mimetype=filestypes.test(file.mimetype)
if (mimetype && extname){
  return cb(null,true)

  }else {
    cb("error: images only")
  }

}


app.get('/subir', function (req, res) {
  res.render('subir',{
    user: req.user
  })
})
app.post('/subir', function (req, res) {

var data={
    title:req.body.title,
    imageUrl:"image.png"
  }
  var product= new Product(data);

upload(req,res,(err)=>{
  if(err){
    res.render('subir',{
      msg: err
    })
  }else{
    if(req.file== undefined){
      res.render("subir",{msg:"error: no file selected"})
    }else{
      res.render('subir',{msg:"File Uploaded"})
    }
  }
})
})



///////////////Perfil de usuario////////////////////
app.get("/profile", isLoggedIn,(req, res)=>{
  res.render("profile",{
    user:req.user
  })
})

function isLoggedIn(req, res,next){
  if (req.isAuthenticated()){
    return next()
  }
return res.redirect("/")
}

////////////////Desloguearse///////////////////
app.get("/logout" ,(req, res)=>{
  req.logout();
  res.redirect("/");

})






}



