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
