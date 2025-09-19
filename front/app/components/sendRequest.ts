export default async function sendRequestAsync(
  url: string,
  method: "POST" | "PUT",
  body: Record<string, unknown>,
  setErrors?: React.Dispatch<React.SetStateAction<string[]>>
) {
  if (setErrors) setErrors([]);

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (setErrors) setErrors([data?.message || "Request failed"]);
      return null;
    }

    return data;
  } catch (err: any) {
    if (setErrors)
      setErrors([err.message || "Something went wrong"]);
    else
      console.error(err.message || "Something went wrong");

    return null;
  }
}
