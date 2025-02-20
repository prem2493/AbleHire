import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './firebase';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const emailKey = user?.email.replace(/[@.]/g, '_'); // Convert email to a valid Firestore key
  const userDocRef = emailKey ? doc(db, 'users', emailKey) : null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState(user ? user.email : '');
  const [bio, setBio] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [desiredRoles, setDesiredRoles] = useState('');
  const [education, setEducation] = useState('');

  useEffect(() => {
    if (userDocRef) {
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setBio(data.bio || '');
          setProfilePicUrl(data.profilePicUrl || '');
          setRole(data.role || '');
          setSkills(data.skills?.join(', ') || '');
          setDisabilityType(data.disability_type || '');
          setJobLocation(data.job_preferences?.location || '');
          setDesiredRoles(data.job_preferences?.desired_roles?.join(', ') || '');
          setEducation(data.education || '');
        }
      });
    }
  }, [userDocRef]);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const storageRef = ref(storage, `profilePictures/${emailKey}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setProfilePicUrl(downloadUrl);
      await setDoc(userDocRef, { profilePicUrl: downloadUrl }, { merge: true });
    }
  };

  const handleSave = async () => {
    if (userDocRef) {
      await setDoc(userDocRef, {
        name,
        bio,
        role,
        skills: skills.split(',').map((s) => s.trim()),
        disability_type: disabilityType,
        job_preferences: {
          location: jobLocation,
          desired_roles: desiredRoles.split(',').map((r) => r.trim()),
        },
        education
      }, { merge: true });

      alert('Profile updated successfully');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <div className="min-h-screen bg-gray-900 text-white p-10">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 space-y-8">
          
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32">
              <img src={profilePicUrl || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full rounded-full object-cover" />
              <input type="file" onChange={handleProfilePictureChange} accept="image/*" className="hidden" id="profilePicInput" />
              <label htmlFor="profilePicInput" className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs rounded cursor-pointer">Change</label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-gray-400">Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 bg-gray-700 rounded"></textarea>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-400">Role</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm text-gray-400">Skills (comma separated)</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
          </div>

          {/* Disability Type */}
          <div>
            <label className="block text-sm text-gray-400">Disability Type</label>
            <input type="text" value={disabilityType} onChange={(e) => setDisabilityType(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
          </div>

          {/* Job Preferences - Location */}
          <div>
            <label className="block text-sm text-gray-400">Job Location</label>
            <input type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
          </div>

          {/* Job Preferences - Desired Roles */}
          <div>
            <label className="block text-sm text-gray-400">Desired Roles (comma separated)</label>
            <input type="text" value={desiredRoles} onChange={(e) => setDesiredRoles(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm text-gray-400">Education</label>
            <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Enter your education details" className="w-full p-2 bg-gray-700 rounded" />
          </div>

          {/* Save & Logout Buttons */}
          <button onClick={handleSave} className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">Save Changes</button>
          <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 p-2 rounded mt-4">Logout</button>
        
        </div>
      </div>
    </motion.div>
  );
}
