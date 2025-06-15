import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

// Custom hook to fetch and set the current logged-in user data
const useGetCurrentUser = () => {
  let dispatch = useDispatch(); // Get dispatch function from redux to dispatch actions

  useEffect(() => {
    // Define async function to fetch current user data from backend
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        // Make GET request to backend API to get current user info
        let result = await axios.get(
          `${import.meta.env.VITE_URL}/api/auth/current`,
          { withCredentials: true }
        );
        console.log("getcurrent user data:", result);
        dispatch(setUser(result?.data?.user)); // Dispatch action to set user data in redux store
      } catch (error) {
        dispatch(setUser(null));
        console.log(error);
      } finally {
        dispatch(setLoading(false)); // stop loading regardless
      }
    };
    // Call the fetchUser function when hook is first used (component mounts)
    fetchUser();
  }, []); // Dependency array includes dispatch to avoid warnings
};

export default useGetCurrentUser;
