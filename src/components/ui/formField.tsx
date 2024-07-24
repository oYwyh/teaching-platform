import { Form, FormControl, FormDescription, FormField as CFormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Field, FieldElement, useController } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { governorates } from "@/constants/index.constant";

type TFormField = {
    form: {
        control: Control<any>;
    };
    name: string,
    select?: string,
    disabled?: boolean,
    type?: string,
    defaultValue?: string,
}

export default function FormField({
    form,
    name,
    select,
    disabled,
    type,
    defaultValue
}: TFormField) {
    const {
        field,
        fieldState: { error: fieldError },
    } = useController({
        name,
        control: form.control,
        defaultValue
    });
    return (
        <>
            <CFormField
                control={form.control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (

                        <>
                            <FormItem className="w-[100%]">
                                {!select && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <FormControl>
                                            <Input
                                                onChange={onChange}
                                                className="capitalize"
                                                disabled={disabled}
                                                value={value}
                                                type={type}
                                                placeholder={`Enter ${name}`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'governorate' && (
                                    <>
                                        <FormLabel className="capitalize">{name}</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={value}
                                            disabled={disabled}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-[100%]">
                                                    <SelectValue placeholder="Select Governorate" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {governorates.map((governorate) => {
                                                    return (
                                                        <SelectItem className="capitalize" value={governorate.value}>{governorate.label}</SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </>
                                )}
                            </FormItem>
                        </>
                    )
                }
                }
            />
        </>
    )
}