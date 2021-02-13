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
    firstname: "John",
    lastname: "Cena",
    profile: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmuc.fandom.com%2Fwiki%2FJohn_Cena&psig=AOvVaw2MtR7cbMqHVH2jUJg98g_X&ust=1613284647385000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCIuOef5u4CFQAAAAAdAAAAABAU",
    userType: "trainer"
  }
  const userInfo = data?.user ? mockUserInfo : null
  
  return {
    props: { userInfo },
  };
};

export default Landing;
