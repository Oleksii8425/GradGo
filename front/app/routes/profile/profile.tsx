import { useAuth } from "~/components/auth/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewtonsCradle } from "ldrs/react";
import JobseekerProfile from "./JobseekerProfile";
import EmployerProfile from "./EmployerProfile";

function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <NewtonsCradle speed="1" color="white" />
      </div>
    );
  }

  if (!user)
    return null;

  if (user.role === "Jobseeker")
    return <JobseekerProfile jobseeker={user} />;

  if (user.role === "Employer")
    return <EmployerProfile employer={user} />;
}

export default Profile;