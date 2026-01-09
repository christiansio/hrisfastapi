import * as Tooltip from '@radix-ui/react-tooltip';


interface InfoTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const InfoTooltip = ({ trigger, content }: InfoTooltipProps) => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <span className="cursor-help">{trigger}</span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content 
                    className="bg-white text-slate-600 p-4 rounded-lg shadow-xl animate-in fade-in zoom-in duration-200 "
                    sideOffset={5}
                >
                    { content }
                    <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    )
}

export default InfoTooltip;