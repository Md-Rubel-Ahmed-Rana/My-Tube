import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, useState } from "react";
import { UserStatus } from "@/types/user.type";

type Props = {
  refetch: (args: { status?: UserStatus; searchQuery?: string }) => void;
};

const UserSearchFilters = ({ refetch }: Props) => {
  const [status, setStatus] = useState<UserStatus | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetch({
      ...(status && { status }),
      ...(searchQuery && { searchQuery }),
    });
  };

  const handleReset = () => {
    setStatus("");
    setSearchQuery("");
    refetch({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4  items-center"
    >
      <div className="flex flex-col space-y-1">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Name, Email, or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as UserStatus)}
        >
          <SelectTrigger id="status" className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
            <SelectItem value={UserStatus.PENDING}>Pending</SelectItem>
            <SelectItem value={UserStatus.BANNED}>Banned</SelectItem>
            <SelectItem value={UserStatus.DELETED}>Deleted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 mt-3">
        <Button type="submit">Apply</Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default UserSearchFilters;
