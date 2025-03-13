import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const observeAuthState = (setUser: (user: any) => void) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
};
