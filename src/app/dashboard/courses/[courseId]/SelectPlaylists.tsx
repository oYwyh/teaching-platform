import CreatePlaylist from "@/app/dashboard/courses/[courseId]/CreatePlaylist";
import { Checkbox } from "@/components/ui/checkbox";
import Context from "@/components/ui/context";
import { Form, FormField as CFormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TPlaylist } from "@/types/index.type";

export default function SelectPlaylists({ form, playlists, courseId, setSelectedPlaylists, selectedPlaylists }: { form: any, playlists: TPlaylist[], courseId: number, setSelectedPlaylists: any, selectedPlaylists?: string[] }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <p className="font-bold text-2xl">Playlist</p>
                <Context size={24} label="Add a video to a playlist (optional)" />
            </div>
            <div className="w-[300px] h-full relative">
                <Popover>
                    <PopoverTrigger>Playlists</PopoverTrigger>
                    <PopoverContent className="absolute w-fit min-w-[300px] min-h-[250px] flex flex-col">
                        <Form {...form}>
                            <form>
                                <CFormField
                                    control={form.control}
                                    name="playlists"
                                    render={() => (
                                        <FormItem className="flex-grow">
                                            <div className="mb-4">
                                                <FormLabel className="text-base">Playlists</FormLabel>
                                                {/* <FormDescription>
                                                Select the items you want to display in the sidebar
                                            </FormDescription> */}
                                            </div>
                                            <div className="flex flex-col gap-2 max-h-[200px] overflow-y-scroll">
                                                {playlists.map((playlist) => (
                                                    <CFormField
                                                        key={playlist.id}
                                                        control={form.control}
                                                        name="playlists"
                                                        render={({ field }) => {
                                                            const valueArray = Array.isArray(field.value) ? field.value : [];
                                                            const isChecked = selectedPlaylists?.includes(String(playlist.id));
                                                            return (
                                                                <FormItem
                                                                    key={playlist.id}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={isChecked || valueArray.includes(String(playlist.id))} onCheckedChange={(checked) => {
                                                                                if (checked) {
                                                                                    field.onChange([...valueArray, String(playlist.id)]);
                                                                                    setSelectedPlaylists([...valueArray, String(playlist.id)]);
                                                                                } else {
                                                                                    const updatedArray = valueArray?.filter((value) => value !== String(playlist.id));
                                                                                    field.onChange(updatedArray);
                                                                                    setSelectedPlaylists(updatedArray);
                                                                                }
                                                                                return checked;
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {playlist.title}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <div className="mt-3 flex justify-end items-end">
                            <CreatePlaylist courseId={courseId} triggerClassName="text-black w-full outline-black" />
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    )
}