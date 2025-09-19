interface ProfileRowProps {
  label: string;
  value?: React.ReactNode
}

function ProfileRow({ label, value }: ProfileRowProps) {
  if (!value)
    return null;

  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default ProfileRow;
