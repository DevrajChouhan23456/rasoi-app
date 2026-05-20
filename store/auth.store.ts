import { getCurrentAccount, getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand'

type AuthState= {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;


  fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated : value }),
  setUser: (user) => set({ user  }),
  setIsLoading: (value) => set({ isLoading : value }),

  fetchAuthenticatedUser: async () => {
    set({isLoading: true});
    try {
      const currentAccount = await getCurrentAccount();

      if (!currentAccount) {
        set({ user: null, isAuthenticated: false });
        return;
      }

      try {
        const user = await getCurrentUser(currentAccount.$id);
        set({ user, isAuthenticated: true });
      } catch (e) {
        console.log("fetchAuthenticatedUser profile error",e);
        set({ user: null, isAuthenticated: true });
      }
    } catch (e) {
      console.log("fetchAuthenticatedUser error",e);
      set({ user: null, isAuthenticated: false });
    }finally{
      set({isLoading: false});
    }}
}))

export default useAuthStore;
