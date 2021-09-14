import type { NextApiRequest, NextApiResponse } from 'next'
import rateLimit from '../../../utils/rate-limit';
import fetch from 'node-fetch';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await limiter.check(res, 10, 'CACHE_TOKEN')

    const { lat } = req.query
    const { lon } = req.query
    const { units } = req.query

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.API_KEY}`

    const response = await fetch(url)
    const body = await response.json()

    res.status(200).json(body)
  } catch {
    res.status(429).json({ error: 'Rate limit exceeded' })
  }
}

export default handler;