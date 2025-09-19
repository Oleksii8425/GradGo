import { useLocation } from "react-router";

function ConfirmEmailMessage() {
  const { state } = useLocation();
  const { email } = state;

  return (
    <p className="text-emerald-500 font-medium p-2 text-center">
      {email
        ? <>We’ve sent a confirmation link to <strong>{email}</strong>. Please click the link to activate your account.</>
        : "We’ve sent a confirmation link to your email. Please click the link to activate your account."}
    </p>
  );
}

export default ConfirmEmailMessage;
