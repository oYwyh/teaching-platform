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
import { courseContexts, courseStatuses, examStatuses, fileStatuses, governorates as governoratesConst, playlistStatuses, regions as regionsConst, specialties, studentContexts, subjectContexts, subjects as subjectsConst, videoStatuses, years as yearsConst } from "@/constants/index.constant";
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
import { CalendarIcon, Check, ChevronsUpDown, CircleEllipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { TIndex, TOptions } from "@/types/index.type";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";


type TFormField = {
    form: {
        control: Control<any>;
    };
    name: string,
    placeholder?: string,
    label?: string,
    select?: string,
    checkbox?: boolean,
    disabled?: boolean,
    optional?: boolean,
    type?: string,
    textarea?: boolean,
    defaultValue?: string | number,
    setState?: any,
    existing?: string[],
    region?: string,
    regions?: TOptions,
    governorates?: TIndex<TOptions>,
    years?: TIndex<TOptions>,
    instructors?: { label: string, value: number }[],
    context?: TIndex<string> | string,
    subjects?: TIndex<TOptions> | TOptions,
    onUnFocus?: () => void,
    transparent?: boolean
}

export default function FormField({
    form,
    name,
    placeholder,
    label,
    select,
    checkbox,
    disabled,
    optional,
    type,
    textarea,
    defaultValue,
    setState,
    existing,
    region,
    regions,
    governorates,
    years,
    instructors,
    context,
    subjects,
    onUnFocus,
    transparent
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
    const subjectsArray = subjects ? subjects : subjectsConst

    return (
        <>
            <CFormField
                control={form.control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (
                        <>
                            <FormItem className="space-y-0 w-[100%]">
                                {!select && !textarea && type != 'date' && (
                                    <>
                                        <div className={`flex flex-row gap-2 items-center`}>
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <FormControl>
                                            <Input
                                                onChange={onChange}
                                                className={`capitalize ${transparent ? "bg-transparent border-0 shadow-md" : ""}`}
                                                disabled={disabled}
                                                value={value}
                                                type={type}
                                                placeholder={`${placeholder ? placeholder : `Enter ${name}`}`}
                                                onBlur={onUnFocus}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                                {!select && textarea && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <FormControl>
                                            <Textarea
                                                onChange={onChange}
                                                className="capitalize h-fit"
                                                disabled={disabled}
                                                value={value}
                                                placeholder={`${placeholder ? placeholder : `Enter ${name}`}`}
                                                onBlur={onUnFocus}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                )}
                                {type == 'date' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            <FormLabel className="capitalize">{label ? label : name}</FormLabel>
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0" align="start">
                                                <Calendar
                                                    className="w-full"
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date: Date) =>
                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </>
                                )}
                                {select == 'governorate' && region && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
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
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-full justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? yearsArray[region]?.find((year) => year?.value == value)?.labelEn
                                                            : "Select year"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0" align="start">
                                                <Command className="w-full">
                                                    <CommandInput placeholder="Search..." />
                                                    <CommandGroup className="overflow-y-scroll max-h-52">
                                                        {yearsArray[region]?.map((year) => (
                                                            <CommandItem
                                                                value={year.value}
                                                                key={year.value}
                                                                onSelect={() => {
                                                                    field.onChange(year.value);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        year.value == value ? "opacity-100" : "opacity-0"
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
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
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
                                                                    if (typeof value == 'number') {
                                                                    } else {
                                                                        setState(region.value);
                                                                    }
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
                                {select == 'specialty' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
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
                                {select == 'studentContext' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            <FormLabel className="capitalize">{label ? label : name}</FormLabel>
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? studentContexts?.find((type: any) => type?.value === value)?.labelEn
                                                            : "Select..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {studentContexts?.map((type: any) => (
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
                                                                {type.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'subjectContext' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            <FormLabel className="capitalize">{label ? label : name}</FormLabel>
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? subjectContexts?.find((context: any) => context?.value === value)?.labelEn
                                                            : "Select..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {subjectContexts?.map((context: any) => (
                                                            <CommandItem
                                                                value={context.value}
                                                                key={context.value}
                                                                onSelect={() => {
                                                                    field.onChange(context.value)
                                                                    setState(context.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        context.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {context.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'courseContext' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? courseContexts?.find((context: any) => context?.value === value)?.labelEn
                                                            : "Select..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {courseContexts?.map((context: any) => (
                                                            <CommandItem
                                                                value={context.value}
                                                                key={context.value}
                                                                onSelect={() => {
                                                                    field.onChange(context.value)
                                                                    setState(context.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        context.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {context.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'subject' && context && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? subjectsArray[context]?.find((subject: any) => subject?.value === value)?.labelEn
                                                            : "Select..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search subject..." />
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {subjectsArray[context]?.filter((subject: any) => !existing?.includes(subject.value)).map((subject: any) => (
                                                            <CommandItem
                                                                value={subject.value}
                                                                key={subject.value}
                                                                onSelect={() => {
                                                                    field.onChange(subject.value)
                                                                    if (setState) {
                                                                        setState(subject.id)
                                                                    }
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        subject.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {subject.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'subject' && region && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? subjects[region]?.find((subject: any) => subject?.value === value)?.labelEn
                                                            : "Select..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search subject..." />
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {subjects[region].map((subject: any) => (
                                                            <CommandItem
                                                                value={subject.value}
                                                                key={subject.value}
                                                                onSelect={() => {
                                                                    field.onChange(subject.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        subject.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {subject.labelEn}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </>
                                )}
                                {select == 'englishExam' && subjects && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? subjects?.find((subject: any) => subject?.value === value)?.labelEn
                                                            : "Select..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[100%] p-0" align="start">
                                                <Command className="w-[100%]">
                                                    <CommandInput placeholder="Search subject..." />
                                                    <CommandGroup className="overflow-y-scroll max-h-[200px]">
                                                        {subjects.map((subject: any) => (
                                                            <CommandItem
                                                                value={subject.value}
                                                                key={subject.value}
                                                                onSelect={() => {
                                                                    field.onChange(subject.value)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        subject.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {subject.labelEn}
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
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? instructors?.find((instructor: any) => instructor?.value === value)?.label
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
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        instructor.value === value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {instructor.label}
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
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
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
                                {select == 'videoStatus' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? videoStatuses?.find((status: any) => status?.value === value)?.value
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
                                                        {videoStatuses?.map((status: any) => (
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
                                {select == 'playlistStatus' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? playlistStatuses?.find((status: any) => status?.value === value)?.value
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
                                                        {playlistStatuses?.map((status: any) => (
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
                                {select == 'fileStatus' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? fileStatuses?.find((status: any) => status?.value === value)?.value
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
                                                        {fileStatuses?.map((status: any) => (
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
                                {select == 'examStatus' && (
                                    <>
                                        <div className="flex flex-row gap-2 items-center mt-1">
                                            {label == '' ? (
                                                <></>
                                            ) : (
                                                <FormLabel className="capitalize" hidden={type == 'hidden' ? true : false}>{label ? label : name}</FormLabel>
                                            )}
                                            {optional && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><CircleEllipsis size={15} color="gray" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Optional Field</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                        <Popover>
                                            <PopoverTrigger disabled={disabled} asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-[100%] justify-between", !value && "text-muted-foreground")}
                                                    >
                                                        {value
                                                            ? examStatuses?.find((status: any) => status?.value === value)?.value
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
                                                        {examStatuses?.map((status: any) => (
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
                            </FormItem >
                        </>
                    )
                }
                }
            />
        </>
    )
}