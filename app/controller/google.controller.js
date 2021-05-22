const GoogleUser = require('../../models/GoogleUser');
const dashboard=(req,res)=>{
    res.render('dashboard',{name:req.user.displayName,picture:req.user.photos[0].value})
  };

const googleCallback=(req, res)=>{
    // Successful authentication, redirect home.
    console.log(req);
    
    registerOrLogin(req);
    res.redirect('/success');
  };

  async function registerOrLogin(req){
    console.log(req.user.name);
    const newUser = {
      googleId: req.user.id,
      displayName: req.user.displayName,
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
      image: req.user.photos[0].value,
    }
    try {
      let user = await GoogleUser.findOne({ googleId: req.user.id })
  
      if (user) {
        done(null, user)
      } else {
        user = await GoogleUser.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
    
  }
module.exports={dashboard,googleCallback};