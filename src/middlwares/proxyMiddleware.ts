import { createProxyMiddleware } from 'http-proxy-middleware'

export const authProxy = createProxyMiddleware({
	router: {
		'/api/auth/': 'http://streaming-auth:5555',
	},
	target: 'http://streaming-auth:5555', // Замените на адрес вашего Spring аутентификационного сервера
	changeOrigin: false,
})
