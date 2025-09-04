import { useAuth } from "~/components/auth/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center max-w-xl w-full py-10">
      <div className="w-full bg-slate-900 rounded-2xl p-8 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
              {user?.userName?.[0] ?? "?"}
            </div>
            <div className="mt-4 flex space-x-2">
              <h1 className="text-2xl font-semibold">
                {user?.userName}
              </h1>
              <button
                onClick={() => logout()}
                className="rounded-lg hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-8 h-8 fill-red-700 hover:fill-red-900"
                >
                  <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-3 w-full">
            {user?.role === "Jobseeker" && (
              <>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">First Name:</span>
                  <span>{user.firstName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Last Name:</span>
                  <span>{user.lastName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Age:</span>
                  <span>{user.age}</span>
                </div>
              </>
            )}
            {user?.role === "Employer" && (
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Name:</span>
                <span>{user?.name}</span>
              </div>
            )}
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Phone:</span>
              <span>{user?.phoneNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Location:</span>
              <span>
                {user?.city}, {user?.country.name}
              </span>
            </div>
            {user?.role === "Employer" && (
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Staff Count:</span>
                <span>{user?.staffCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;