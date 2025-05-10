import React, { useEffect, useState } from "react";
import { IconSquareX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthContext";


const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariant = {
  hidden: { scale: 0.9, opacity: 0, y: 40 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: 40,
    transition: { duration: 0.2 },
  },
};

// Base Modal Component
export const BaseModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-lg bg-white dark:bg-neutral-900 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <IconSquareX className="w-5 h-5 dark:text-white cursor-pointer" stroke={2} />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// LOGIN MODAL COMPONENT

export const LoginModal = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password);
      onClose();
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Login to Your Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Don't have an account?{" "}
        <span
          onClick={onSwitch}
          className="underline cursor-pointer text-black dark:text-white"
        >
          Register
        </span>
      </p>
    </BaseModal>
  );
};

// REGISTER MODAL COMPONENT

export const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const [error, setError] = useState(null);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const form = e.target;
    const data = {
      fullName: form.fullName.value,
      username: form.username.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      password: form.password.value,
      dob: form.dob.value,
      gender: form.gender.value,
      maritalStatus: form.maritalStatus.value,
    };

    try {
      await register(data);
      onClose();
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Create an Account">
      {/* Constrain height & enable scrolling */}
      <div className="max-h-[70vh] overflow-y-auto space-y-4 text-sm p-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              maxLength={100}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              minLength={4}
              maxLength={20}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john_doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="tel"
              pattern="^\+?[0-9]{10,15}$"
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+919876543210"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              minLength={8}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Date of Birth
            </label>
            <input
              name="dob"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <span className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Gender
            </span>
            <div className="flex gap-4">
              {["MALE", "FEMALE"].map((g) => (
                <label key={g} className="flex items-center gap-1 text-sm dark:text-gray-300">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    className="form-radio text-blue-600"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              {["UNMARRIED", "MARRIED"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* Switch */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => {
              onClose();
              onSwitch();
            }}
            className="underline cursor-pointer text-black dark:text-white"
          >
            Sign In
          </span>
        </p>
      </div>
    </BaseModal>
  );
};

// TrailerModal Component
export function TrailerModal({ isOpen, onClose, trailerUrl, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* Modal Content */}
          <motion.div
            className="relative m-3 z-50 w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xl shadow-xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg dark:text-white font-semibold">{title}</h3>
              <IconSquareX onClick={onClose} className="w-8 h-8 dark:text-white cursor-pointer p-1 hover:scale-110 transition" stroke={2} />
            </div>
            <div className="p-4">
              {/* Responsive YouTube Embed */}
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={trailerUrl}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// EditProfileModal Component
export const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    id: user?.id || '',
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    password: user?.password,
    dob: user?.dob || '',
    gender: user?.gender || 'MALE',
    maritalStatus: user?.maritalStatus || 'UNMARRIED',
    role: user?.role || 'USER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateProfile(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input
              type="date"
              required
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Marital Status</label>
          <select
            required
            value={formData.maritalStatus}
            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 px-3 py-2"
          >
            <option value="UNMARRIED">Unmarried</option>
            <option value="MARRIED">Married</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
