import fs from 'fs/promises'
import path from 'path'

const API_URL_FORMAT =
	'https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v6&q={}_{}'

// Helper function to convert emoji to hex codes
const multicharOrd = (str: string) => {
	return Array.from(str)
		.map(c => {
			const codePoint = c.codePointAt(0)
			return codePoint !== undefined ? codePoint.toString(16) : ''
		})
		.join('-')
}

async function getEmojiCombination(emojis: string | any[]) {
	const emoji1 = emojis[Math.floor(Math.random() * emojis.length)]
	const emoji2 = emojis[Math.floor(Math.random() * emojis.length)]
	const apiUrl = API_URL_FORMAT.replace('{}', encodeURIComponent(emoji1)).replace('{}', encodeURIComponent(emoji2))

	const response = await fetch(apiUrl)
	const data = await response.json()

	if (!data.results || data.results.length === 0) {
		console.log(
			`❌ ${multicharOrd(emoji1)}_${multicharOrd(emoji2)} (${emoji1} + ${emoji2}) - Not found, retrying...`
		)
		return null
	}

	console.log(`✅ ${multicharOrd(emoji1)}_${multicharOrd(emoji2)} (${emoji1} + ${emoji2})`)
	return data.results[0].media_formats.png_transparent.url
}

export default async function checkEmojiCombination(retries = 10) {
	try {
		const emojiPath = path.resolve(__dirname, './Emoji.txt')
		const fileContent = await fs.readFile(emojiPath, 'utf-8')
		const emojis = fileContent.trim().split('\n')

		let attempt = 0
		let result = null
		while (attempt < retries && result === null) {
			result = await getEmojiCombination(emojis)
			attempt++
		}

		if (result) {
			console.log(`🎉 Found emoji combination: ${result}`)
		} else {
			console.log('🚨 No valid emoji combination found after retries.')
		}
		return result
	} catch (error) {
		console.error('Error occurred:', error)
		return null
	}
}

checkEmojiCombination()
	.then(() => console.log('Process completed.'))
	.catch(error => console.error('An error occurred:', error))
