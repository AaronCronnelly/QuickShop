import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

function ProfilePage() {
  // const [shoppingLists, setShoppingLists]=useState([]);
  const { logout } = useAuth(); // Access logout function from AuthContext
  // const [userId, setuserId] = useState('');
  // // Placeholder for lists
  const shoppingLists = ['List 1', 'List 2', 'List 3'];

  // useEffect(()=> {
  //   const fetchShoppingList=async () => {
  //     try{
  //       //fetch shopping list form the backend 
  //       const response = await fetch(`/api/lists/${userId}`);
  //       if(!response.ok){
  //         throw new Error('Failed to fetch shopping lists');
  //       }
  //       const data = await response.json();
  //       setShoppingLists(data);
  //     }catch (error){
  //       console.error('Error fetching shopping lsits: ', error);
  //     }
  //   }
  //   fetchShoppingList();
  // }, [userId]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="user-info">
        <h3>Your Information</h3>
        {/* Placeholder for user information */}
        <p><strong>Username:</strong> user123</p>
        <p><strong>Email:</strong> user@example.com</p>
      </div>
      <div className="shopping-lists">
        <h3>Previous Shopping Lists</h3>
        <ul>
          {/* Map over shoppingLists array to render list items */}
          {shoppingLists.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </div>
      {/* Logout button */}
      <button onClick={logout} className="register-btn">Logout</button>
    </div>
  );
}

export default ProfilePage;
