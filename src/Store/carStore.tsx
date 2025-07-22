import { create } from "zustand";
import { currentCarList } from "@/Api/currentCarList";
import { toast } from "sonner";

interface Car {
  number: string;   // 차량 번호
  name: string;     // 차량명
  mileage: number;  // 주행거리 (ex: "0km")
  status: string;   // 상태 (ex: "미운행", "운행중")
}

interface CarStore {
  // 속성
  cars: Car[];                         // 전체 차량 리스트
  filteredCars: Car[];                // 필터링된 차량 리스트
  selected: Set<string>;              // 선택된 차량 번호들
  filter: { carNumber: string; status: string };  // 검색 필터

  // 함수
  setFilter: (filter: { carNumber: string; status: string }) => void;
  applyFilter: () => void;
  addCar: (car: Car) => void;
  deleteSelectedCars: () => void;
  toggleSelect: (carNumber: string) => void;
  toggleSelectAll: (visibleCars: Car[]) => void;
}

export const useCarStore = create<CarStore>((set, get) => ({
  cars: currentCarList,
  filteredCars: currentCarList,
  selected: new Set(),
  filter: { carNumber: "", status: "" },

  // 검색 조건 설정
  setFilter: (filter) => set({ filter }),

  // 필터 적용
  applyFilter: () => {
    const { cars, filter } = get();
    const { carNumber, status } = filter;

    const filtered = cars.filter((car) => {
      const matchesNumber = car.number.includes(carNumber);
      const matchesStatus = status === "" || car.status === status;

      if (carNumber === "") {
        return matchesStatus;
      }

      return matchesNumber && matchesStatus;
    });

    set({ filteredCars: filtered });
  },

  // 차량 추가 (최상단 삽입)
  addCar: (car) => {
    const newCars = [car, ...get().cars];
    set({ cars: newCars });
    get().applyFilter();
  },

  // 선택된 차량 삭제
  deleteSelectedCars: () => {
    const selected = get().selected;
    const remaining = get().cars.filter((car) => !selected.has(car.number));
    set({ cars: remaining, selected: new Set() });
    get().applyFilter();
  },

  // 단일 차량 선택 토글
  toggleSelect: (carNumber) => {
    const selected = new Set(get().selected);
    if (selected.has(carNumber)) {
      selected.delete(carNumber);
    } else {
      selected.add(carNumber);
      toast(`${selected.size}개의 차량이 선택되었습니다.`);
    }
    set({ selected });
  },

  // 현재 페이지의 모든 차량 선택/해제
  toggleSelectAll: (visibleCars) => {
    const selected = new Set(get().selected);
    const allSelected = visibleCars.every((car) => selected.has(car.number));
    if (allSelected) {
      visibleCars.forEach((car) => selected.delete(car.number));
    } else {
      visibleCars.forEach((car) => selected.add(car.number));
      toast(`${selected.size}개의 차량이 선택되었습니다.`);
    }
    set({ selected });
    
  },
}));