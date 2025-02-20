import React, { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-gray-200 border-b pb-4">Settings</h2>

        {/* Profile Settings */}
        <div>
          <h3 className="text-xl font-medium mb-4">Profile</h3>
          <div className="space-y-4">
            <button className="text-blue-400 hover:underline">Change Profile Picture</button>
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <input type="text" className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input type="email" className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white" />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div>
          <h3 className="text-xl font-medium mb-4">Account</h3>
          <div className="space-y-4">
            <button className="text-blue-400 hover:underline mr-5">Change Password</button>
            <button className="text-red-500 hover:underline">Delete Account</button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-xl font-medium mb-4">Privacy</h3>
          <label className="block text-sm text-gray-400">Profile Visibility</label>
          <select className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white mt-2">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Theme Settings */}
        <div>
          <h3 className="text-xl font-medium mb-4">Appearance</h3>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark/Light Mode
          </button>
        </div>

        {/* Notifications Settings */}
        <div>
          <h3 className="text-xl font-medium mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="mr-2"
              />
              Enable Email Notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                className="mr-2"
              />
              Enable Push Notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
