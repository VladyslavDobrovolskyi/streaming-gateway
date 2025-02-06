import fs from 'fs/promises'

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

export default async function checkEmojiCombination() {
	try {
		// Read emojis from file
		const fileContent = await fs.readFile('./Emoji.txt', 'utf-8')
		const emojis = fileContent.trim().split('\n')

		// Pick two random emojis
		const emoji1 = emojis[Math.floor(Math.random() * emojis.length)]
		const emoji2 = emojis[Math.floor(Math.random() * emojis.length)]

		// Create API URL
		const apiUrl = API_URL_FORMAT.replace('{}', encodeURIComponent(emoji1)).replace(
			'{}',
			encodeURIComponent(emoji2)
		)

		// Make API request
		const response = await fetch(apiUrl)
		const data = await response.json()

		if (!data.results || data.results.length === 0) {
			console.log(` ${multicharOrd(emoji1)}_${multicharOrd(emoji2)} (${emoji1} + ${emoji2})`)
			return null
		}

		console.log(`✅ ${multicharOrd(emoji1)}_${multicharOrd(emoji2)} (${emoji1} + ${emoji2})`)
		const url = data.results[0].media_formats.png_transparent.url

		return url
	} catch (error) {
		console.error('Error occurred:', error)
		return null
	}
}

// Run the function
checkEmojiCombination()
	.then(() => {
		console.log('Process completed.')
	})
	.catch(error => {
		console.error('An error occurred:', error)
	})
