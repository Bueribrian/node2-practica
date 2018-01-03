module.exports = (app, passport) =>{


app.get("/",function(req,res){
	res.render("home")
})

app.get('/login', function (req, res) {
  res.render('login',{
  	message: req.flash("loginMessage")
  })
})

app.post("/login", passport.authenticate("local-signup",{
	successRedirect: "/loginexitoso",
	failureRedirect:"/logincaca",
	failureFlash: true,
}))
app.get('/registrar', function (req, res) {
  res.render('registrar',{
  	message: req.flash("signup message")
  })
})

app.post("/registrar", passport.authenticate("local-signup",{
	successRedirect: "/",
	failureRedirect:"/registrar",
	failureFlash: true,
}))
//app.post("/registrar",passport.aunthenticate("local-signup")){
//successRedirect: "/usuario",
//failureRedirect: "/registrar",
//failureFlash: true,

//}

app.get('/informacion', function (req, res) {
  res.render('informacion')
})

app.get('/user', function (req, res) {
  res.render('user',{
  	user: req.user
  })
})




app.get("/loginexitoso",function(req,res){
	res.send("login exitoso")
})

app.get("/logincaca",function(req,res){
	res.send("login caca")
})
}
