export default function handler(req, res) {
  if (req.method === 'GET') {
    if (req?.cookies[process.env.NEXT_PUBLIC_COOKIE_NAME]) {
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
