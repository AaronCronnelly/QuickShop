import React from 'react';
import { useAuth } from './AuthContext';

function ProfilePage() {
  const { logout } = useAuth();

  // Placeholder for lists
  const shoppingLists = ['List 1', 'List 2', 'List 3'];

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="user-info">
        <h3>User Information</h3>
        {/* Placeholder for user information */}
        <p><strong>Username:</strong> user123</p>
        <p><strong>Email:</strong> user@example.com</p>
      </div>
      <div className="shopping-lists">
        <h3>Previous Shopping Lists</h3>
        <ul>
          {shoppingLists.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default ProfilePage;

