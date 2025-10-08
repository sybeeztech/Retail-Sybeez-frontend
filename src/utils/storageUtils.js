// Utility to fix localStorage issues
export const clearStorageAndReload = () => {
  try {
    // Clear all localStorage
    localStorage.clear();
    
    // Clear sessionStorage as well
    sessionStorage.clear();
    
    // Reload the page
    window.location.reload();
  } catch (error) {
    console.error('Error clearing storage:', error);
    // Force reload even if clearing fails
    window.location.reload();
  }
};

// Utility to safely parse JSON from localStorage
export const safeJSONParse = (value, fallback = null) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn('JSON parsing error:', error);
    return fallback;
  }
};

// Fix localStorage auth data
export const fixAuthStorage = () => {
  try {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      // Try to parse the existing data
      JSON.parse(authData);
    }
  } catch (error) {
    console.warn('Corrupted auth storage detected, clearing...');
    localStorage.removeItem('auth-storage');
  }
};