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
import { courseCategories, courseStatuses, exams as examsConst, governorates as governoratesConst, regions as regionsConst, specialties, studentTypes, years as yearsConst } from "@/constants/index.constant";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";


type TFormField = {
    form: {
        control: Control<any>;
    };
    name: string,
    select?: string,
    disabled?: boolean,
    type?: string,
    textarea?: boolean,
    defaultValue?: string,
    setState?: any,
    existing?: string[],
    region?: string,
    regions?: { labelAr: string; labelEn: string; value: string; }[],
    governorates?: { [key: string]: { labelAr: string; labelEn: string; value: string; }[]; },
    years?: { [key: string]: { labelAr: string; labelEn: string; value: string; }[]; },
    exams?: { labelAr: string; labelEn: string; value: string; }[],
    instructors?: { id: number, value: string }[],
    context?: 'school' | 'exam' | string
}

export default function FormField({
    form,
    name,
    select,
    disabled,
    type,
    textarea,
    defaultValue,
    setState,
    existing,
    region,
    regions,
    governorates,
    years,
    exams,
    instructors,
    context
}: TFormField) {
    const {
        field,
        fieldState: { error: fieldError },
    } = useController({
        name,
        control: form.control,
        defaultValue
    });

    const regionsArray = regions ? regions : regionsConst
    const governoratesArray = governorates ? governorates : governoratesConst
    const yearsArray = years ? years : yearsConst
    const examsArray = exams ? exams : examsConst

    return (
        <>
            <CFormField
                control={form.control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (
                        <>
                            <FormItem className="w-[100%]">
                                {!select && !textarea && (
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
                                {!select && textarea && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                onChange={onChange}
                                                className="capitalize h-fit"
                                                disabled={disabled}
                                                value={value}
                                                placeholder={`Enter ${name}`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'governorate' && region && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? governoratesArray[region]?.find((governorate: any) => governorate?.value === value)?.labelEn
                                                            : "Select governorate"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search..." />
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {governoratesArray[region]?.map((governorate: any) => (
                                                            <CommandItem
                                                                value={governorate.value}
                                                                key={governorate.value}
                                                                onSelect={() => {
                                                                    field.onChange(governorate.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        governorate.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {governorate.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'year' && region && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? yearsArray[region]?.find((year: any) => year?.value === value)?.labelEn
                                                            : "Select year"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search..." />
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {yearsArray[region]?.map((year: any) => (
                                                            <CommandItem
                                                                value={year.value}
                                                                key={year.value}
                                                                onSelect={() => {
                                                                    field.onChange(year.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        year.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {year.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'region' && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? regionsArray?.find((region: any) => region?.value === value)?.labelEn
                                                            : "Select region"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search region..." />
                                                    <CommandEmpty>No region found.</CommandEmpty>
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {regionsArray?.filter((region: any) => !existing?.includes(region.value)).map((region: any) => (
                                                            <CommandItem
                                                                value={region.value}
                                                                key={region.value}
                                                                onSelect={() => {
                                                                    field.onChange(region.value);
                                                                    setState(region.value);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        region.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {region.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{fieldError?.message}</FormMessage>
                                    </>
                                )}
                                {select == 'exam' && (
                                    <div className="flex flex-col gap-2">
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? examsArray?.find((exam: any) => exam?.value === value)?.labelEn
                                                            : "Select exam"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search exam..." />
                                                    <CommandEmpty>No exam found.</CommandEmpty>
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {examsArray?.filter((exam: any) => !existing?.includes(exam.value)).map((exam: any) => (
                                                            <CommandItem
                                                                value={exam.value}
                                                                key={exam.value}
                                                                onSelect={() => field.onChange(exam.value)}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        exam.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {exam.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{fieldError?.message}</FormMessage>
                                    </div>
                                )}
                                {select == 'specialty' && (
                                    <div className="flex flex-col gap-2">
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? specialties?.find((specialty: any) => specialty?.value === value)?.labelEn
                                                            : "Select specialty"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search specialty..." />
                                                    <CommandEmpty>No specialty found.</CommandEmpty>
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {specialties.map((specialty: any) => (
                                                            <CommandItem
                                                                value={specialty.value}
                                                                key={specialty.value}
                                                                onSelect={() => field.onChange(specialty.value)}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        specialty.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {specialty.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{fieldError?.message}</FormMessage>
                                    </div>
                                )}
                                {select == 'studentType' || select == 'courseContext' && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{select == 'studentType' ? 'Why are you here' : 'This Course For..'}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? studentTypes?.find((type: any) => type?.value === value)?.labelEn
                                                            : "Select..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {studentTypes?.map((type: any) => (
                                                            <CommandItem
                                                                value={type.value}
                                                                key={type.value}
                                                                onSelect={() => {
                                                                    field.onChange(type.value)
                                                                    setState(type.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        type.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {type.labelEn}{select == 'courseContext' && 's'}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'instructor' && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? instructors?.find((instructor: any) => instructor?.value === value)?.value
                                                            : "Select instructor"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search instructor..." />
                                                    <CommandEmpty>No instructor found.</CommandEmpty>
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {instructors?.map((instructor: any) => (
                                                            <CommandItem
                                                                value={instructor.value}
                                                                key={instructor.value}
                                                                onSelect={() => {
                                                                    field.onChange(instructor.value);
                                                                    setState(instructor.id)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        instructor.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {instructor.value}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{fieldError?.message}</FormMessage>
                                    </>
                                )}

                                {select == 'courseStatus' && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? courseStatuses?.find((status: any) => status?.value === value)?.value
                                                            : "Select status"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search status..." />
                                                    <CommandEmpty>No status found.</CommandEmpty>
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {courseStatuses?.map((status: any) => (
                                                            <CommandItem
                                                                value={status.value}
                                                                key={status.value}
                                                                onSelect={() => {
                                                                    field.onChange(status.value);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        status.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {status.value}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{fieldError?.message}</FormMessage>
                                    </>
                                )}
                                {select == 'courseCategory' && (
                                    <>
                                        <FormLabel className="capitalize" hidden={type ? true : false}>{name}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? courseCategories[context]?.find((category: any) => category?.value === value)?.value
                                                            : "Select category"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search category..." />
                                                    <CommandEmpty>No category found.</CommandEmpty>
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {courseCategories[context]?.map((category: any) => (
                                                            <CommandItem
                                                                value={category.value}
                                                                key={category.value}
                                                                onSelect={() => {
                                                                    field.onChange(category.value);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        category.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {category.value}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{fieldError?.message}</FormMessage>
                                    </>
                                )}

                            </FormItem >
                        </>
                    )
                }
                }
            />
        </>
    )
}