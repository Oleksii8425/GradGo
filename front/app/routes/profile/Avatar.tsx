function Avatar({ userName }: { userName?: string }) {
  return (
    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
      {userName?.[0] ?? "?"}
    </div>
  );
}

export default Avatar;
