export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({
      email: req.body.email || 'mock_email',
      token: 'mock_token',
    });
  }
}
