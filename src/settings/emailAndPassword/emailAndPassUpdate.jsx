import UserEmailUpdate from "./userEmailUpdate";
import UserPasswordUpdate from "./userPasswordUpdate";

const EmailAndPassword = () => {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Email & Password</h2>

      <UserEmailUpdate />

      <UserPasswordUpdate />
    </div>
  );
};

export default EmailAndPassword;
