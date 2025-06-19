import { Button } from "@/components/ui/button";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import NotLoggedInAlert from "../common/NotLoggedInAlert";
import AddCommentModal from "./AddCommentModal";

const AddCommentButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const { data } = useGetLoggedInUserQuery({});
  const currentUser = data?.data as IUser;

  const handleOpenModal = () => {
    if (!currentUser?.id) {
      setNotLoggedIn(true);
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="outline"
        className="bg-gray-200 dark:bg-gray-700"
      >
        Add a Comment
      </Button>
      {notLoggedIn && (
        <NotLoggedInAlert
          open={notLoggedIn}
          onOpenChange={setNotLoggedIn}
          alertText="You must be logged in to post comment to a video. Please log in to continue."
        />
      )}

      {isOpen && <AddCommentModal open={isOpen} setOpen={setIsOpen} />}
    </>
  );
};

export default AddCommentButton;
