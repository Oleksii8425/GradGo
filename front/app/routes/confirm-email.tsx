import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Confirming...");

  useEffect(() => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    if (!userId || !token) {
      setStatus("Invalid confirmation link");
      return;
    }

    fetch(`http://localhost:5272/users/confirm-email?userId=${userId}&token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.text();
      })
      .then(() => {
        setStatus("Email confirmed! Redirecting...");
        setTimeout(() => navigate("/jobs"), 2000);
      })
      .catch((err) => {
        setStatus("Error: " + err.message);
      });
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>{status}</p>
    </div>
  );
}
