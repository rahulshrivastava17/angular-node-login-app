const UsersController = require('../controllers/UsersController');
const auth = require('../../auth/auth');
const jwtAuth = require('../../auth/jwtAuth');
const router = express.Router();
const users = new UsersController();

const createUser = (req,res,next) => {
	users.createUser(req.body).then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.status(400).send(err);
    });
};

const updateUser = (req,res,next) => {
	users.updateUser(req).then((data) => {
		 res.status(200).json({ message: 'Successfully updated' });;
	}).catch((error) => {
		res.status(400).send(err);
	});
};

const findUser = (req,res) => {
	users.findUser(req.query).then((data) => {
		 res.status(200).json(data);
	}).catch((error) => {
		res.status(400).json('error',error);
	});
};

const deleteUser = (req,res,next) => {
	users.deleteUser({
            _id: req.query.id
        }).then((data) => { 
        	if(data){
				res.json({ message: 'Successfully deleted'});
        	}
        	else{
        		res.json({message: 'No user found!'});
        	}
		
	}).catch((error) => {
		res.json({ error: error });
	});
};
app.use(jwtAuth.jwtAuth);
app.use('/api', router);
router.get('/', (req, res) => {
    res.send('Hello world');   
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/login', auth.authenticate);
router.post('/users', createUser);
router.put('/users', updateUser);
router.get('/users', findUser);
router.delete('/users', deleteUser);
module.exports = {
    router
};