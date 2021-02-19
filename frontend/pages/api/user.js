export default function handler(req, res) {
  if (req.method === 'GET') {
    if (req?.headers?.authorization.substring(7) == 'mock_token') {
      res.status(200).json({
        firstname: 'Somluck',
        profileImageUrl:
          'https://www.aceshowbiz.com/images/photo/john_cena.jpg',
        userType: 'trainer',
      });
    } else {
      res.status(200);
      res.end();
    }
  }
}
