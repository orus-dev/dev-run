"use client";

import { useState } from "react";
import { Folder, FolderMinus, FolderPlus, File } from "lucide-react";

type TreeNode = {
  type: "directory" | "file";
  uri: string;
  children?: TreeNode[];
};

interface FileTreeProps {
  tree: TreeNode;
  level?: number; // for indentation
  delay?: number; // stagger delay in ms
}

export const FileTree: React.FC<FileTreeProps> = ({
  tree,
  level = 0,
  delay = 0,
}) => {
  const [expanded, setExpanded] = useState(
    tree.type !== "directory" || level === 0 ? true : false,
  );

  const toggleExpand = () => {
    if (tree.type === "directory") {
      setExpanded(!expanded);
    }
  };

  return (
    <div>
      {/* Directory/File Row */}
      <div
        onClick={toggleExpand}
        style={{
          paddingLeft: level * 20,
          animationDelay: `${delay}ms`,
        }}
        className="flex items-center cursor-pointer select-none animate-fade-in opacity-0"
      >
        {tree.type === "directory" ? (
          expanded ? (
            <FolderMinus size={16} className="mr-2" />
          ) : (
            <FolderPlus size={16} className="mr-2" />
          )
        ) : (
          <File size={16} className="mr-2" />
        )}
        {tree.uri}
      </div>

      {/* Children */}
      {expanded &&
        tree.children?.map((child, index) => (
          <FileTree
            key={child.uri}
            tree={child}
            level={level + 1}
            // stagger each child by 100ms
            delay={delay + (index + 1) * 100}
          />
        ))}
    </div>
  );
};
