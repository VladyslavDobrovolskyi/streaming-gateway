import express, { Request, Response } from 'express'
import getEmojiAvatar from '../utils/getEmojiAvatar'
const router = express.Router()

router.get('/emoji', async (_req: Request, res: Response) => {
	const url = await getEmojiAvatar()
	res.json({ url })
})

export default router
