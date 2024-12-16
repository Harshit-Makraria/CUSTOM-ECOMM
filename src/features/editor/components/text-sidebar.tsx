import { 
  ActiveTool, 
  Editor, 
} from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  defaultHeight: number;
  defaultWidth: number;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
  defaultHeight,
  defaultWidth,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const calculateFontSize = (baseSize: number) => {
    return Math.round((defaultHeight + defaultWidth) / 1000 * baseSize);
  };

  const calculateFontWeight = (baseWeight: number) => {
    return Math.min(Math.max(Math.round((defaultHeight + defaultWidth) / 100 * baseWeight), 100), 900);
  };

console.log("TextSidebar")
console.log(defaultHeight)
console.log(defaultWidth)
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Text"
        description="Add text to your canvas"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full"
            onClick={() => editor?.addText("Textbox")}
          >
            Add a textbox
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={() => editor?.addText("Heading", {
              fontSize: calculateFontSize(80),
                fontWeight: calculateFontWeight(700),
            })}
          >
            <span className="text-3xl font-bold">
              Add a heading
            </span>
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={() => editor?.addText("Subheading", {
              fontSize: calculateFontSize(44),
                fontWeight: calculateFontWeight(600),
            })}
          >
            <span className="text-xl font-semibold">
              Add a subheading
            </span>
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={() => editor?.addText("Paragraph", {
              fontSize: calculateFontSize(32),
            })}
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
