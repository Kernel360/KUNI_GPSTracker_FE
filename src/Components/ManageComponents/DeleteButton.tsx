import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { CircleAlert, FileX2 } from "lucide-react";
import { useCarStore } from "../../Store/carStore";
import { toast } from "sonner";

import { useState } from "react";

export function DeleteButton() {
  const selected = useCarStore((state) => state.selected);
  const deleteSelectedCars = useCarStore((state) => state.deleteSelectedCars);
  const [isOpen, setIsOpen] = useState(false);
  const selectedArray = Array.from(selected);
  const showItems = selectedArray.slice(0, 2);
  const hiddenCount = selectedArray.length - showItems.length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => {
          if (selected.size !== 0) {
            setIsOpen(true);
          } else {
            toast("삭제할 차량을 선택해 주세요", {
              description: "",
              icon: <CircleAlert />,
            });
          }
        }}
        className="min-w-[96px] px-4 py-2 bg-[#FF4343] gap-2 hover:bg-[#FF4343]/80 justify-center"
      >
        삭제( {selected.size} )
      </Button>

      <DialogContent className="w-[25%]">
        <DialogHeader>
          <DialogTitle>차량을 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <ul>
          {showItems.map((car: any, idx) => (
            <li key={idx}>• {car}</li>
          ))}
          {hiddenCount > 0 && <li>• 외 {hiddenCount}대</li>}
        </ul>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button
            className="bg-[#8D99FF] gap-3 hover:bg-[#8D99FF]/80"
            onClick={() => {
              deleteSelectedCars();
              setIsOpen(false);
              toast(
                hiddenCount > 0 ? (
                  <span>
                    <strong>{selectedArray[0]}</strong> 외 
                    <strong> {hiddenCount}</strong>대의 차량이 삭제되었습니다
                  </span>
                ) : (
                  <span>
                    <strong>{selectedArray[0]}</strong> 차량이 삭제되었습니다
                  </span>
                ), {
                  icon: <FileX2 />
                }
              );
            }}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
