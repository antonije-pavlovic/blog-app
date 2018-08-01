const express = require('express');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: 'public/post' });
const expressSession = require('express-session');
const edge = require('edge.js');
const app = express();


const newPostController = require('./controllers/newPost');
const homePageController = require('./controllers/homePage');
const storePostController =require('./controllers/storePost');
const singlePostController = require('./controllers/singlePost');
const registerController = require('./controllers/registerUser');
const creteUserController = require('./controllers/createUser');
const loginController = require('./controllers/login');
const userLoginController = require('./controllers/userLogin');
const userLogoutController = require('./controllers/userLogout')
const newPostMiddleware = require ('./middleware/storePost');
const userRegistrationMiddleware = require('./middleware/userRegistration');


app.use(express.static('public'));
app.use(expressEdge);

app.use(expressSession({
    secret : 'secret'
}));

app.use('*',(req,res,next)=>{
    if(req.session.user_id){
        edge.global('session',req.session.user_id);        
    }else{
        edge.global('session',false); 
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('views', `${__dirname}/views`);

app.get('/',homePageController);
app.get('/post/:id',singlePostController);
app.get('/posts/new',newPostController);
app.get('/auth/register',registerController)
app.post('/post/store',upload.single('image'),newPostMiddleware,storePostController);
app.post('/register',userRegistrationMiddleware,creteUserController);
app.get('/login',loginController);
app.post('/user/login',userLoginController);
app.get('/logout',userLogoutController);

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});