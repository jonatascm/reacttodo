import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const router = express.Router();

function generateToken(params = {}){
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 2592000, //Month in seconds
  });
  
}

router.post('/register', async (req, res) => {
  const {email} = req.body;

  try {
    if( await User.findOne({email}) )
      return res.status(400).send({ error: 'User already exists' })
 
    const user = await User.create(req.body);
    
    user.password = undefined;
  
    return res.send({user, token: generateToken({id: user.id})});
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  try{

    const user = await User.findOne({email}).select('+password');

    if(!user)
      return res.status(400).send({ error: 'User not found'});


    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid password'});

    user.password = undefined; 


    return res.send({ user, token: generateToken({id: user.id})  });
  }catch (err) {
    return res.status(400).send({error: 'Error on authenticate password'});
  }
});

export default router;
