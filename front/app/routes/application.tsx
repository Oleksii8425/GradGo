import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "~/components/auth/AuthContext";

function Application() {
  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobId } = useParams<{ jobId: string }>();
  const [cv, setCv] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [coverLetterText, setCoverLetterText] = useState<string | null>(null);

  const onApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const formData = new FormData();

    if (jobId) formData.append("jobId", jobId);
    formData.append("jobseekerId", user.id);
    formData.append("cv", cv!);

    if (coverLetter) formData.append("coverLetter", coverLetter);
    if (coverLetterText) formData.append("coverLetterText", coverLetterText);

    const res = await fetch("http://localhost:5272/applications", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      alert(error?.message ?? "Something went wrong");
      return;
    }

    const data = await res.json();
    console.log("Application submitted:", data);
  };

  return (
    <form
      onSubmit={onApply}
      className='flex flex-col gap-2 self-center rounded-lg p-4 bg-slate-900'
    >
      <div className='flex gap-2 items-center'>
        <label htmlFor='cv' className='required'>
          Upload your CV (max {MAX_SIZE_MB}MB)
        </label>
        <input
          type='file'
          name='cv'
          id='cv'
          accept='.pdf, .docx'
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            if (file.size > MAX_SIZE_BYTES) {
              alert("File is too large!");
              e.target.value = "";
              return;
            }

            setCv(file);
          }}
          required
          className='flex-1 rounded-lg p-2 border hover:border-slate-400 hover:bg-slate-800'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <div>
          <label htmlFor='coverLetter' className='mr-2 optional'>
            Write or upload your cover letter
          </label>
          <input
            type='file'
            name='coverLetter'
            id='coverLetter'
            accept='.pdf, .docx, .txt'
            onChange={(e) => setCoverLetter(e.target.files?.[0] ?? null)}
            className='rounded-lg p-2 border hover:border-slate-400 hover:bg-slate-800'
          />
        </div>
        <textarea
          name='coverLetter'
          id='coverLetter'
          onChange={(e) => setCoverLetterText(e.target.value)}
          className='rounded-lg p-2 min-h-[40px] max-h-[300px] border'
        />
      </div>
      <input
        type='submit'
        value='Apply'
        className='self-center rounded-full px-4 py-2 bg-slate-700 hover:bg-slate-600'
      />
    </form>
  );
}

export default Application;
