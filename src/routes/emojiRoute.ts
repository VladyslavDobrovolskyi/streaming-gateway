import express, { Request, Response } from 'express'
import getEmojiAvatar from '../utils/getEmojiAvatar'
const router = express.Router()

router.get('/emoji', (_req: Request, res: Response) => {
	const url = getEmojiAvatar()
	res.json({ url })
})

export default router
