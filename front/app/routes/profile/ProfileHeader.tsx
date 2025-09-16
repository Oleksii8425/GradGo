import { useAuth } from "~/components/auth/AuthContext";

function ProfileHeader({ userName }: { userName: string }) {
  const { logout } = useAuth();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
        {userName?.[0] ?? "?"}
      </div>
      <div className="mt-4 flex space-x-2 items-center">
        <h1 className="text-2xl font-semibold">{userName}</h1>
        <button
          onClick={() => logout()}
          className="rounded-lg hover:cursor-pointer"
          title="Log out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-8 h-8 fill-red-700 hover:fill-red-600"
          >
            <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
