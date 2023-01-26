import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (request, response) => {
	const { method, url } = request
	
	await json(request, response)
	
	const route = routes.find(route => 
		(route.method === method && route.path.test(url))
	)
	
	if (route) {
		const routeParams = url.match(route.path)
		console.log(routeParams);
		return route.handler(request, response)
	}
	
	return response.write(404).end()
})

server.listen(3333)