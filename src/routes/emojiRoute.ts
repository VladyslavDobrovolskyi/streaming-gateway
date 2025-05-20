import express, { Request, Response } from 'express'
import { checkEmojiCombination } from '../utils/getEmoji'
import { checkLockCombination } from '../utils/getEmoji'
import { checkTicketCombination } from '../utils/getEmoji'
import { checkSearchCombination } from '../utils/getEmoji'
const router = express.Router()

router.get('/avatar', async (_req: Request, res: Response) => {
	const url = await checkEmojiCombination()
	res.json({ url })
})

router.get('/lock', async (_req: Request, res: Response) => {
	const url = await checkLockCombination()
	res.json({ url })
})

router.get('/ticket', async (_req: Request, res: Response) => {
	const url = await checkTicketCombination()
	res.json({ url })
})

router.get('/search', async (_req: Request, res: Response) => {
	const url = await checkSearchCombination()
	res.json({ url })
})

export default router
