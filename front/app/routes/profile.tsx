import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/AuthContext";

function Profile() {
  const { user, token, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isAuthLoading)
    return <p>Loading...</p>
  else
    return <p>Welcome {user!.userName}</p>
}

export default Profile;