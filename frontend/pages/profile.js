import React, { useState } from 'react'
import useUser from '../lib/useUser';
import AppLayout from '../components/AppLayout';
import EditProfile from '../components/EditProfile';
import InformationProfile from '../components/InformationProfile';
import moment from 'moment'

const Profile = () => {
  const { user = {}, mutateUser } = useUser({ redirectTo: '/' });
  const [isEditing, setIsEditing] = useState(false);

  user.birthdate = moment(user.birthdate);

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen flex justify-center">
        <div className="bg-white w-full m-12 py-12 px-24 rounded-lg">
          <div className="text-4xl sm:text-5xl font-bold">{isEditing ? "Edit Profile" : "Profile"}</div>
          {
            isEditing ?
              <EditProfile profile={user} setIsEditing={setIsEditing} /> :
              <InformationProfile profile={user} setIsEditing={setIsEditing} />
          }
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
