"use client";

import { useState, useRef, useEffect } from "react";
import { root, findNodeByPath } from "@/lib/filesystem";
import { useApps, AppState } from "@/contexts/AppsContext";

interface TerminalProps {
  app: AppState;
}

export function Terminal({ app }: TerminalProps) {
  const [history, setHistory] = useState<React.ReactNode[]>([
    `Welcome to Ujjwal's Ubuntu WebApp! Type "help" for a list of commands.`,
  ]);
  const [currentPath, setCurrentPath] = useState("~");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { closeApp } = useApps();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const input = inputRef.current;
      if (input) {
        const command = input.value;
        const parts = command.trim().split(" ");
        const cmd = parts[0];
        const lastPart = parts[parts.length - 1].replace(/"/g, "");

        if (cmd === "cd" || cmd === "ls" || cmd === "cat") {
          const node = findNodeByPath(root, currentPath);
          if (node && node.type === "directory") {
            const childrenNames = Object.keys(node.children);
            const match = childrenNames.find((name) =>
              name.startsWith(lastPart)
            );

            if (match) {
              const commandPart = parts.slice(0, -1).join(" ");
              input.value = `${commandPart} ${
                match.includes(" ") ? `"${match}"` : match
              }`;
            }
          }
        }
      }
    }
  };

  const handleCommand = async (command: string) => {
    const rawParts = command.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = rawParts[0];
    const args = rawParts.slice(1).map((arg) => arg.replace(/"/g, ""));

    const newHistory = [
      ...history,
      <div key={history.length} className="whitespace-nowrap">
        <span className="text-green-400">{`user@ubuntu:${currentPath}`}</span>
        $ {command}
      </div>,
    ];

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <pre className="text-xs sm:text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
            {`Available commands:
help            - Show this help message.
ls              - List files and directories.
cd [directory]  - Change directory.
cat [file]      - Display file content.
echo [text]     - Display a line of text.
clear, cls      - Clear the terminal screen.
exit            - Close the terminal.`}
          </pre>
        );
        break;
      case "ls":
        const node = findNodeByPath(root, currentPath);
        if (node && node.type === "directory") {
          output = (
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm md:text-base">
              {Object.keys(node.children).map((name) => (
                <span
                  key={name}
                  className={
                    node.children[name].type === "directory"
                      ? "text-blue-400"
                      : "text-foreground"
                  }
                >
                  {name.includes(" ") ? `'${name}'` : name}
                </span>
              ))}
            </div>
          );
        } else {
          output = (
            <span className="text-red-400 text-xs sm:text-sm md:text-base">
              {`ls: cannot access '${currentPath}': No such file or directory`}
            </span>
          );
        }
        break;
      case "cd":
        const targetDir = args.join(" ").replace(/"/g, "");
        if (!targetDir) {
          setCurrentPath("~");
          break;
        }

        let resolvedPath = "";
        if (targetDir === "..") {
          if (currentPath === "~") {
            resolvedPath = "~";
          } else {
            const parts = currentPath.split("/");
            parts.pop();
            resolvedPath = parts.join("/") || "~";
          }
        } else if (targetDir.startsWith("~/")) {
          resolvedPath = targetDir;
        } else if (targetDir === "~") {
          resolvedPath = "~";
        } else {
          resolvedPath =
            currentPath === "~" ? `~/${targetDir}` : `${currentPath}/${targetDir}`;
        }
        const targetNode = findNodeByPath(root, resolvedPath);
        if (targetNode && targetNode.type === "directory") {
          setCurrentPath(resolvedPath);
        } else {
          output = (
            <span className="text-red-400 text-xs sm:text-sm md:text-base">
              {`cd: ${targetDir}: No such file or directory`}
            </span>
          );
        }
        break;
      case "cat":
        const filePath =
          currentPath === "~" ? `~/${args[0]}` : `${currentPath}/${args[0]}`;
        const fileNode = findNodeByPath(root, filePath);
        if (fileNode && fileNode.type === "file") {
          output = (
            <pre className="text-xs sm:text-sm md:text-base whitespace-pre-wrap break-words">
              {fileNode.content}
            </pre>
          );
        } else {
          output = (
            <span className="text-red-400 text-xs sm:text-sm md:text-base">
              {`cat: ${args[0]}: No such file or directory`}
            </span>
          );
        }
        break;
      case "echo":
        output = (
          <span className="text-xs sm:text-sm md:text-base break-words">
            {args.join(" ")}
          </span>
        );
        break;
      case "clear":
      case "cls":
        setHistory([]);
        return;
      case "exit":
        closeApp(app.id);
        return;
      case "":
        break;
      default:
        output = (
          <span className="text-red-400 text-xs sm:text-sm md:text-base">
            {`${cmd}: command not found`}
          </span>
        );
        break;
    }
    setHistory([
      ...newHistory,
      <div
        key={newHistory.length}
        className="whitespace-pre-wrap text-foreground break-words"
      >
        {output}
      </div>,
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input) {
      handleCommand(input.value);
      input.value = "";
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-background/80 text-foreground font-code text-xs sm:text-sm md:text-base p-2 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, index) => (
        <div key={index} className="mb-1">
          {line}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center flex-wrap gap-1">
        <span className="text-green-400 whitespace-nowrap">{`user@ubuntu:${currentPath}`}</span>
        <span className="whitespace-nowrap">$</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-none outline-none flex-1 text-inherit text-xs sm:text-sm md:text-base min-w-[50px]"
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </form>
    </div>
  );
}