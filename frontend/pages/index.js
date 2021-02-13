import cookie from 'cookie';
import AppLayout from '../components/AppLayout';

const Landing = ({ userInfo }) => (
  <AppLayout userInfo={userInfo}>
    <div className="min-h-screen flex justify-center pt-40 font-bold text-4xl">
      Content
    </div>
  </AppLayout>
);

export async function getServerSideProps({ req }) {
  const data = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
  );

  // TODO: fetch user info from server
  const mockUserInfo = {
    firstname: "Somluck",
    lastname: "Kamsing",
    profileImageUrl: "https://www.aceshowbiz.com/images/photo/john_cena.jpg",
    userType: "trainer"
  }
  const userInfo = data?.user ? mockUserInfo : null
  
  return {
    props: { userInfo },
  };
};

export default Landing;
