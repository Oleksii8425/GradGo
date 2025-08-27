export default async function submitForm(
  url: string,
  body: Record<string, unknown>,
  setErrors: React.Dispatch<React.SetStateAction<string[]>>,
  navigate: (path: string) => void,
  navigateTo: string
) {
  setErrors([]);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let data = await res.json();

    if (!res.ok) {
      setErrors([data.message]);
      return;
    }

    navigate(navigateTo);
  } catch (err: any) {
    setErrors([err.message || "Something went wrong"]);
  }
}
