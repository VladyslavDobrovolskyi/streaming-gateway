import fs from 'fs/promises'
import path from 'path'

interface TenorResponse {
	results?: {
		media_formats: {
			png_transparent: {
				url: string
			}
		}
	}[]
}

const API_URL_FORMAT: string =
	'https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v6&q={}_{}'

// Преобразует эмодзи в их кодовые точки
const multicharOrd = (str: string): string => {
	return Array.from(str)
		.map(c => {
			const codePoint = c.codePointAt(0)
			return codePoint !== undefined ? codePoint.toString(16) : ''
		})
		.join('-')
}

// Получить комбинацию эмодзи emoji1 + emoji2
async function getEmojiCombinationWithFixed(emoji1: string, emoji2: string): Promise<string | null> {
	const apiUrl: string = API_URL_FORMAT.replace('{}', encodeURIComponent(emoji1)).replace(
		'{}',
		encodeURIComponent(emoji2)
	)

	const response = await fetch(apiUrl)
	const data: TenorResponse = await response.json()

	if (!data.results || data.results.length === 0) {
		console.log(
			`❌ ${multicharOrd(emoji1)}_${multicharOrd(emoji2)} (${emoji1} + ${emoji2}) - Not found, retrying...`
		)
		return null
	}

	console.log(`✅ ${multicharOrd(emoji1)}_${multicharOrd(emoji2)} (${emoji1} + ${emoji2})`)
	return data.results[0].media_formats.png_transparent.url
}

// Рандомная комбинация из двух любых эмодзи
async function getEmojiCombination(emojis: string[]): Promise<string | null> {
	const emoji1 = emojis[Math.floor(Math.random() * emojis.length)]
	const emoji2 = emojis[Math.floor(Math.random() * emojis.length)]
	return getEmojiCombinationWithFixed(emoji1, emoji2)
}

// Основная функция — случайная комбинация
export async function checkEmojiCombination(): Promise<string | null> {
	try {
		const emojiPath = path.resolve(__dirname, './Emoji.txt')
		const fileContent = await fs.readFile(emojiPath, 'utf-8')
		const emojis = fileContent.trim().split('\n')

		let result: string | null = null
		while (result === null) {
			result = await getEmojiCombination(emojis)
		}

		console.log(`🎉 Found random combination: ${result}`)
		return result
	} catch (error) {
		console.error('Error occurred:', error)
		return null
	}
}

// Комбинация с замком (🔒)
export async function checkLockCombination(): Promise<string | null> {
	try {
		const emojiPath = path.resolve(__dirname, './Emoji.txt')
		const fileContent = await fs.readFile(emojiPath, 'utf-8')
		const emojis = fileContent.trim().split('\n')

		let result: string | null = null
		while (result === null) {
			const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
			result = await getEmojiCombinationWithFixed(randomEmoji, '🔒')
		}

		console.log(`🔐 Found lock combination: ${result}`)
		return result
	} catch (error) {
		console.error('Error occurred:', error)
		return null
	}
}

export async function checkSearchCombination(): Promise<string | null> {
	try {
		const emojiPath = path.resolve(__dirname, './Emoji.txt')
		const fileContent = await fs.readFile(emojiPath, 'utf-8')
		const emojis = fileContent.trim().split('\n')

		let result: string | null = null
		while (result === null) {
			const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
			result = await getEmojiCombinationWithFixed(randomEmoji, '🔍')
		}

		console.log(`🔍 Found lock combination: ${result}`)
		return result
	} catch (error) {
		console.error('Error occurred:', error)
		return null
	}
}

// Комбинация с билетом (🎫)
export async function checkTicketCombination(): Promise<string | null> {
	try {
		const emojiPath = path.resolve(__dirname, './Emoji.txt')
		const fileContent = await fs.readFile(emojiPath, 'utf-8')
		const emojis = fileContent.trim().split('\n')

		let result: string | null = null
		while (result === null) {
			const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
			result = await getEmojiCombinationWithFixed(randomEmoji, '🎫')
		}

		console.log(`🎟️ Found ticket combination: ${result}`)
		return result
	} catch (error) {
		console.error('Error occurred:', error)
		return null
	}
}

// Примеры запуска
async function runAll() {
	await checkEmojiCombination()
	await checkLockCombination()
	await checkTicketCombination()
	console.log('✅ All checks completed.')
}

runAll().catch(err => console.error('Unexpected error:', err))
