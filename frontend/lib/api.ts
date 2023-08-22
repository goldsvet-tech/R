const API_URL = 'https://api.github.com/repos/vercel/next.js';


export async function getPreviewPost() {
  const res = await fetch(API_URL);
	const json = await res.json()

  return json
}
