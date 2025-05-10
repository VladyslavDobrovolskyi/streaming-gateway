import express from 'express'
import userRoutes from './routes/userRoutes'
import roomReservationsRoutes from './routes/roomRoutes'
import emojiRoute from './routes/emojiRoute'
// import { authProxy } from './middlwares/proxyMiddleware'

const app = express()
const port = 20888

app.use(express.json())

// app.use('/auth', authProxy)
app.use('/emoji', emojiRoute)
app.use('/users', userRoutes)
app.use('/room_reservations', roomReservationsRoutes)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
