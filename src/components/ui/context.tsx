import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface contextProps {
    size?: number; // Default size will be 24px if not provided
    label: string
}

export default function Context({ size = 24, label }: contextProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Info className={`text-gray-500`} style={{ width: size, height: size }} />
                </TooltipTrigger>
                <TooltipContent>
                    <span>{label}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}