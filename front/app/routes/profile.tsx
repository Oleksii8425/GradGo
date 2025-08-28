import { useAuth } from "~/components/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  return <p>Welcome {user?.userName}</p>;
}

export default Profile;