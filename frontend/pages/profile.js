import React, { useState } from 'react'
import useUser from '../lib/useUser';
import AppLayout from '../components/AppLayout';
import EditProfile from '../components/EditProfile';
import InformationProfile from '../components/InformationProfile';
import moment from 'moment'

const Profile = () => {
  const { user = {}, mutateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const d = moment("08/08/2000")
  const mock = {
      id: "23433bertgerb33g4ry",
      email: "test@gmail.com",
      type: "TRAINER",
      profile: {
          userId: "asefernvo3tn4th",
          firstname: "Jason",
          lastname: "Youngku",
          cid: "1234567891011",
          gender: "male",
          birthdate: d,
          phoneNumber: "123412341",
          profileImageUrl: "/login.svg"
      }
  }
  console.log(mock)

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen flex justify-center">
        <div className="bg-white w-full m-12 py-12 px-24 rounded-lg">
          <div className="text-4xl sm:text-5xl font-bold">{isEditing ? "Edit Profile" : "Profile"}</div>
          {
            isEditing ? 
            <EditProfile profile={mock.profile} setIsEditing={setIsEditing} /> : 
            <InformationProfile email={mock.email} profile={mock.profile} setIsEditing={setIsEditing}/>
          }
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
