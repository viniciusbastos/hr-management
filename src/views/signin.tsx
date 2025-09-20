import { type FormEvent, useContext, useState } from 'react'
import '../main.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/authContext'
import loginImage from '../assets/login.png'
import { Button, TextField, Box, Typography, Paper } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = {
        email: email,
        password: password,
      }
      await signIn(data)
    } catch (err) {
      setError('Invalid credentials. Please try again.')
      console.error('Sign in error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="w-4/5 h-screen hidden lg:block">
        <img
          src={loginImage}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <TextField
            required
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <TextField
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
            fullWidth
          >
            Sign In
          </LoadingButton>
        </Box>
      </div>
    </div>
  )
}

export default SignIn
