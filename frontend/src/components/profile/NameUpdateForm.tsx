import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUpdateUserNameMutation } from "@/features/user";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useRouter } from "next/router";

type Props = {
  id: string;
  name: string;
  username: string;
  setOpen: (value: boolean) => void;
};

const NameUpdateForm = ({ id, name = "", username, setOpen }: Props) => {
  const [newName, setNewName] = useState(name);
  const router = useRouter();
  const [updateUserName, { isLoading }] = useUpdateUserNameMutation();

  const handleUpdateName = async () => {
    await handleApiMutation(
      updateUserName,
      { id, name: newName },
      200,
      {
        success: "Name updated successfully",
        error: "Failed to update name",
      },
      {
        isRedirect: true,
        path: `/profile/${
          username || newName?.split(" ")?.join("-")
        }?name=${newName}`,
        router,
      }
    );
    setOpen(false);
  };

  return (
    <div className=" flex-col items-center gap-4">
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        disabled={isLoading}
        placeholder="Enter your name"
        className="max-w-sm"
        required
      />
      <div className="flex items-center gap-2 mt-2">
        <Button size={"sm"} onClick={() => setOpen(false)} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          size={"sm"}
          onClick={handleUpdateName}
          disabled={
            isLoading || name.trim() === newName.trim() || !newName.trim()
          }
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default NameUpdateForm;
