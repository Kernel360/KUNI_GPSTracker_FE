import { SearchButton } from "@/Components/ManageComponents/SearchButton";
import { DeleteButton } from "@/Components/ManageComponents/DeleteButton";
import { StatusSelect } from "@/Components/ManageComponents/StatusSelection";
import { SearchInput } from "@/Components/ManageComponents/SearchInput";
import { AddCarButton } from "@/Components/ManageComponents/AddCarButton";

export function ManageInputs() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-3">
        <SearchInput />
        <StatusSelect />
        <SearchButton />
        <AddCarButton />
      </div>
      <DeleteButton />
    </div>
  );
}
