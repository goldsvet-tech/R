import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://api.github.com/repos/vercel/next.js';

export async function fetchApi() {
  const res = await fetch(API_URL);
	const json = await res.json()
  return json
}

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page_size, id, slug } = req.query
  const post = await fetchApi()

  return res.status(200).json({ post })
}