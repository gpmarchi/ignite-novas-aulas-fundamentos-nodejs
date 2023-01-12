import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
	index = 1
	
	_read() {
		const i = this.index++
		
		setTimeout(() => {
			if (i > 5) {
				this.push(null)
			} else {
				const buf = Buffer.from(String(i))
				
				this.push(buf)
			}
		}, 1000)
	}
}

// Receive response back from the server
fetch('http://localhost:3334', {
	method: 'POST',
	body: new OneToHundredStream(),
}).then(response => {
	return response.text()
}).then(data => {
	console.log(data)
})

// Simple request without response
// fetch('http://localhost:3334', {
// 	method: 'POST',
// 	body: new OneToHundredStream(),
// })