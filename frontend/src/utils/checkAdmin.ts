// Utility to check if current user is admin
export const checkIfAdmin = (): boolean => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return false;
    
    const user = JSON.parse(storedUser);
    return user?.role === 'admin';
  } catch (e) {
    console.error('Error checking admin status:', e);
    return false;
  }
};

// Utility to get user role
export const getUserRole = (): 'user' | 'admin' | null => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    
    const user = JSON.parse(storedUser);
    return user?.role || 'user';
  } catch (e) {
    console.error('Error getting user role:', e);
    return null;
  }
};
