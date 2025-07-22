import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { Checkbox } from "../ui/checkbox";
import { TablePagination } from "../TablePagination";
import { useRef, useState } from "react";
import { useCarStore } from "../../Store/carStore";
import { ArrowDownUp } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { cn } from "@/lib/utils";

export function CarTable() {
  const tableRef = useRef<HTMLDivElement>(null); // 테이블의 너비값을 전달하기 위한 wrapper
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortKey, setSortKey] = useState<"number" | "name" | "mileage" | "status" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const cars = useCarStore((state) => state.filteredCars.length > 0 ? state.filteredCars : state.cars);
  const selectedCars = useCarStore((state) => state.selected);
  const toggleSelection = useCarStore((state) => state.toggleSelect);
  const toggleSelectAll = useCarStore((state) => state.toggleSelectAll);

  const handleSort = (key: "number" | "name" | "mileage" | "status") => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const visibleCars = sortedCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const isAllSelected = visibleCars.every((car) => selectedCars.has(car.number));

  return (
    <div ref={tableRef} 
    className="h-[470px] w-full flex flex-col gap-4 p-1"
    >
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center cursor-pointer" onClick={() => handleSort("number")}>
            <div className="flex items-center justify-center gap-1">
              <ArrowDownUp size={14} />
              <span>차량 번호</span>
            </div>
          </TableHead>
          <TableHead className="text-center cursor-pointer" onClick={() => handleSort("name")}>
            <div className="flex items-center justify-center gap-1">
              <ArrowDownUp size={14} />
              <span>차량명</span>
            </div>
          </TableHead>
          <TableHead className="text-center cursor-pointer" onClick={() => handleSort("mileage")}>
            <div className="flex items-center justify-center gap-1">
              <ArrowDownUp size={14} />
              <span>주행거리</span>
            </div>
          </TableHead>
          <TableHead className="text-center cursor-pointer" onClick={() => handleSort("status")}>
            <div className="flex items-center justify-center gap-1">
              <ArrowDownUp size={14} />
              <span>상태</span>
            </div>
          </TableHead>
          <TableHead className="text-right">
            <Checkbox checked={isAllSelected} onCheckedChange={() => toggleSelectAll(visibleCars)} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visibleCars.map((car) => (
          <TableRow key={car.number} className={cn("text-center", selectedCars.has(car.number) ? "bg-muted" : "")}>
            <TableCell className="font-medium">{car.number}</TableCell>
            <TableCell>{car.name}</TableCell>
            <TableCell>{car.mileage.toLocaleString()} km</TableCell>
            <TableCell><StatusBadge status={car.status} /></TableCell>
            <TableCell className="text-right">
              <Checkbox
                checked={selectedCars.has(car.number)}
                onCheckedChange={() => toggleSelection(car.number)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        
      </TableFooter>
    </Table>
      <TablePagination
      tableRef={tableRef}
      total={Math.ceil(cars.length / itemsPerPage)}
      current={currentPage}
      setCurrent={setCurrentPage}
    />
    
    </div>
  );
}
