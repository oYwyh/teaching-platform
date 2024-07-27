import FormUpdateProfile from "@/app/profile/_components/FormUpdateProfile";
import FormUpdatePassword from "@/app/profile/_components/FormUpdatePassword";
import { validateRequest } from "@/lib/auth";
import UpdateProfilePicture from "@/app/profile/_components/UpdateProfilePicture";
import { getUser } from "@/actions/index.actions";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <>
      {user ? (
        <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
          <UpdateProfilePicture
            user={user}
          />
          <FormUpdateProfile
            user={user}
          />
          <FormUpdatePassword
            id={user.id}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );

}