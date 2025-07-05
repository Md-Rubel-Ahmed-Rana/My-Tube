import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUpdateUserNameMutation } from "@/features/user";
import { handleApiMutation } from "@/utils/handleApiMutation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  id: string;
  name: string;
  setOpen: (value: boolean) => void;
  open: boolean;
};

const NameUpdateForm = ({ id, name = "", setOpen, open }: Props) => {
  const [newName, setNewName] = useState(name);
  const [updateUserName, { isLoading }] = useUpdateUserNameMutation();

  const handleUpdateName = async () => {
    await handleApiMutation(updateUserName, { id, name: newName }, 200, {
      success: "Name updated successfully",
      error: "Failed to update name",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Change name</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            disabled={isLoading}
            placeholder="Enter your name"
            className="max-w-sm"
            required
          />
        </div>

        <DialogFooter className="flex justify-between w-full mt-4">
          <DialogClose asChild>
            <Button disabled={isLoading}>Cancel</Button>
          </DialogClose>
          <Button
            variant="secondary"
            onClick={handleUpdateName}
            disabled={isLoading || name.trim() === newName.trim()}
            className="bg-gray-300 dark:bg-gray-800"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NameUpdateForm;
