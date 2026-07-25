import {
  NodeViewContent,
  NodeViewWrapper,
  type NodeViewProps,
} from "@system/lib/tiptap";
import { GripVertical } from "lucide-react";

const CodeBlockView = ({
  node,
  updateAttributes,
  extension,
}: NodeViewProps) => {
  const languages = extension.options.lowlight.listLanguages();

  return (
    <NodeViewWrapper className="group relative my-4 w-full rounded-lg border bg-gray-900 p-4 transition-all">
      <div
        contentEditable={false}
        data-drag-handle
        className="absolute top-2 -left-6 cursor-grab rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200"
      >
        <GripVertical size={16} className="text-gray-400" />
      </div>

      <select
        contentEditable={false}
        className="absolute top-2 right-2 z-10 cursor-pointer rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 outline-none hover:bg-gray-700"
        value={node.attrs.language || "null"}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">Auto</option>
        {languages.map((lang: string) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <pre className="m-0! mt-4 bg-transparent! p-0!">
        <NodeViewContent
          as={"code" as "div"}
          className={`hljs min-h-6 font-mono text-sm outline-none ${
            node.attrs.language ? `language-${node.attrs.language}` : ""
          }`}
        />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockView;
