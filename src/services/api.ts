import { Monitor, create } from 'apisauce'

const timeout: number = parseInt(process.env.TIMEOUT || "30000", 30000)
const apiURL = process.env.NEXT_PUBLIC_API_URL || ""

const api = create({
    baseURL: apiURL,
    headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache'
    },
    timeout: timeout
})

const monitor = (response: Monitor) => {
    const {} = response
}

// api.addMonitor()

export default api