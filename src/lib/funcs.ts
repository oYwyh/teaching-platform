import { governorates } from "@/constants/index.constant";

export function getGovernorateArabicName(name: string) {
    const governorate = governorates.find(g => g.value.toLowerCase() === name.toLowerCase());
    return governorate ? governorate.label : null;
}