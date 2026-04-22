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
