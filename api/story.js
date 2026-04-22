export default async function handler(req, res) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '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',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
}
