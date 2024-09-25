import React, { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserDataProps {
  userId: string;
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const intervalIdRef = React.useRef<number | undefined>(undefined);

  useEffect(() => {
    fetchUserData();
    intervalIdRef.current = window.setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        window.clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
