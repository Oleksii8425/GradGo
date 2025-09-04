import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/components/auth/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { updateUser, updateToken } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setErrors([]);

    try {
      const res = await fetch("http://localhost:5272/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors([data?.message || "Login failed"]);
        return;
      }

      const data = await res.json();
      updateUser(data.user);
      updateToken(data.token);

      navigate("/profile");
    } catch (err) {
      setErrors(["Something went wrong"]);
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-xs bg-slate-900 p-6 rounded-2xl shadow-md"
      >

        {
          errors.length > 0 && (
            <ul className="text-red-500 list-none text-sm">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )
        }

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-green-700 text-white rounded py-2 hover:bg-green-900"
        >
          Login
        </button>

        <p>
          Not registered?
          <a href="/register" className="hover:text-green-700"> Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
