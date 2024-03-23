var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  const uid = Date.now();

  try {
      // Check if the user already exists
      let users = await User.findOne();

      if (!users) {
          // If user doesn't exist, create a new one
          const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
          user = new User({ 
              username, 
              password: hashedPassword,
              pbillid: 0, // Initial value for pbillid
              sbill: 0, // Initial value for sbill
              creditnoteid: 0, // Initial value for creditnoteid
              debitnoteid: 0, // Initial value for debitnoteid
              urdbillid: 0, // Initial value for urdbillid
              financialyear: new Date().getFullYear(), // Initial value for financialyear
              uid: uid
          });
          await user.save();

          // Store user session data
          req.session.user = user;
          req.session.islogged = true;
          req.session.token = uid;

          // Send JSON response to the frontend
          res.json({ success: true, message: 'User created successfully!', token: uid });
      } else {
          let user = await User.findOne({ username });

          // If user exists, compare hashed passwords
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
              // Update user's token and save it
              user.uid = uid;
              await user.save();

              // Store user session data
              req.session.user = user;
              req.session.islogged = true;
              req.session.token = uid;

              // Send JSON response to the frontend
              res.json({ success: true, message: 'Login successful!', token: uid });
          } else {
              // Send JSON response indicating incorrect password
              res.status(401).json({ success: false, message: 'Incorrect password!' });
          }
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/logout', (req, res) => {
  // Clear the session or remove the token from the session
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          // Session destroyed successfully
          res.clearCookie('connect.sid'); // Clear session cookie
          return res.redirect('/login');
        }
  });
});
module.exports = router;
