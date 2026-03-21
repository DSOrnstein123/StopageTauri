import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useTabStore } from "@/app/store/tabStore";
import { useNavigate } from "@tanstack/react-router";

interface FileProps {
  id: string;
  title: string;
}

const File = ({ id, title }: FileProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const addTab = useTabStore((state) => state.addTab);
  const navigate = useNavigate();

  const handleOnClick = () => {
    setIsSelected(true);
    addTab(`/documents/${id}`, title);
    navigate({ to: "/documents/$documentId", params: { documentId: id } });
  };

  return (
    <div
      onClick={handleOnClick}
      className={cn(
        "h-7 rounded-md px-2 py-1 text-sm hover:bg-[#e3e3e3]/50",
        isSelected ? "bg-[#e3e3e3] font-medium" : "",
      )}
    >
      <div>{title ? title : "New document"}</div>
    </div>
  );
};

export default File;
