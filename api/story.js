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
