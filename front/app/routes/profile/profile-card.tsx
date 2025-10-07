interface ProfileCardProps {
  label: string;
  value: string;
}

function ProfileCard({ label, value }: ProfileCardProps) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <p className="text-sm text-gray-400">{label}</p>
      <p>{value}</p>
    </div>
  );
}

export default ProfileCard;
