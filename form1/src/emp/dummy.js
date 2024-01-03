
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
    }

    // Create a new user
    const newUser = new User({ username, password });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'Registration successful!' });

  } catch (error) {
    console.error('Registration error:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});