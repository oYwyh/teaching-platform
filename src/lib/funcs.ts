import { governorates } from "@/constants/index.constant";

export function getGovernorateArabicName(name: string) {
    return name
}

export const computeSHA256 = async (file: any) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}