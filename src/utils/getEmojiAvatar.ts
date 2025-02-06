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
	'https://tenor.googleapis.com/v2/featured?key=YOUR_API_KEY&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v6&q={}_{}'

// Helper function to convert emoji to hex codes
const multicharOrd = (str: string): string => {
	return Array.from(str)
		.map(c => {
			const codePoint = c.codePointAt(0)
			return codePoint !== undefined ? codePoint.toString(16) : ''
		})
		.join('-')
}

async function getEmojiCombination(emojis: string[]): Promise<string | null> {
	const emoji1: string = emojis[Math.floor(Math.random() * emojis.length)]
	const emoji2: string = emojis[Math.floor(Math.random() * emojis.length)]
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

export default async function checkEmojiCombination(): Promise<string | null> {
	try {
		const emojiPath: string = path.resolve(__dirname, './Emoji.txt')
		const fileContent: string = await fs.readFile(emojiPath, 'utf-8')
		const emojis: string[] = fileContent.trim().split('\n')

		let result: string | null = null
		while (result === null) {
			result = await getEmojiCombination(emojis)
		}

		console.log(`🎉 Found emoji combination: ${result}`)
		return result
	} catch (error) {
		console.error('Error occurred:', error)
		return null
	}
}

checkEmojiCombination()
	.then(() => console.log('Process completed.'))
	.catch((error: Error) => console.error('An error occurred:', error))
