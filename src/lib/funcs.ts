import { governorates } from "@/constants/index.constant";
import { TIndex } from "@/types/index.type";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";

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

export const normalizeDataFields = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string') {
            data[key] = value.toLowerCase();
        }
    });
};

export const handleError = (form: UseFormReturn<any>, error: Record<string, string>) => {
    for (const [field, message] of Object.entries(error)) {
        form.setError(field, {
            type: "server",
            message: message,
        });
    }
};

export const compareFields = (data: TIndex<string> & any, userData: TIndex<string> & any, ignoredFields: string[] = []) => {
    const dobString = format(data.dob, 'yyyy-MM-dd');
    data['dob'] = dobString;
    const userFields = Object.keys(userData).filter(field => !ignoredFields?.includes(field));
    const unChangedFields: string[] = [];
    const changedFields: string[] = [];

    userFields.forEach(field => {
        if (typeof data[field] == 'string' && typeof userData[field] == 'string' && isNaN(Number(data[field])) && isNaN(Number(userData[field]))) {
            if (data[field]?.toLowerCase() !== userData[field]?.toLowerCase()) {
                changedFields.push(field);
            } else {
                unChangedFields.push(field);
            }
        } else if (!isNaN(data[field]) && !isNaN(userData[field])) {
            if (Number(data[field]) != Number(userData[field])) {
                changedFields.push(field);
            } else {
                unChangedFields.push(field);
            }
        }
    });

    data['dob'] = data.dob;
    return { changedFields, unChangedFields };
};

export const handleRequiredFields = ({ form, fields }: { form: UseFormReturn<any>, fields: string[] }): boolean => {
    let hasError = false;

    fields.forEach(field => {
        if (!form.getValues(field)) {
            form.setError(`${field}`, { type: 'server', message: `${field} is required` });
            hasError = true;
        }
    });

    return hasError;
}