import { tags as t } from "@lezer/highlight";
import createTheme from "./create-theme";

// Original theme: thememirror (dracula)
export const devRun = createTheme({
  variant: "dark",
  settings: {
    background: "var(--card)", // stays app-integrated
    foreground: "#e6e6eb",
    caret: "var(--primary)",
    selection: "rgba(120, 120, 150, 0.25)",
    gutterBackground: "var(--card)",
    gutterForeground: "rgb(120, 122, 128)",
    lineHighlight: "rgba(255, 255, 255, 0.03)",
  },
  styles: [
    // Comments — low priority, low contrast
    {
      tag: t.comment,
      color: "#5f6a8a",
      fontStyle: "italic",
    },

    // Strings & literals — data, not logic
    {
      tag: [t.string, t.special(t.brace)],
      color: "#f4e58c",
    },

    // Numbers / booleans — benchmarks & truth
    {
      tag: [t.number, t.bool, t.null],
      color: "#c792ea",
      fontWeight: "500",
    },

    // Keywords & operators — decisions & flow
    {
      tag: [t.keyword, t.operator],
      color: "#ff5fa2",
      fontWeight: "600",
    },

    // Types & definitions — structure
    {
      tag: [t.definitionKeyword, t.typeName],
      color: "#6be6ff",
    },

    // Type definitions — neutral, readable
    {
      tag: t.definition(t.typeName),
      color: "#e6e6eb",
    },

    // Functions, classes, props — execution paths
    {
      tag: [
        t.className,
        t.definition(t.propertyName),
        t.function(t.variableName),
        t.attributeName,
      ],
      color: "#4dff9f",
      fontWeight: "500",
    },

    // Variables — slightly muted, context-aware
    {
      tag: t.variableName,
      color: "#cfd3dc",
    },

    // Invalid / errors — instant attention
    {
      tag: t.invalid,
      color: "#ff5555",
      fontWeight: "700",
    },
  ],
});
