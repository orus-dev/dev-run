import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

/**
 * devRun — direct CodeMirror 6 theme
 * Based on thememirror (dracula), app-integrated
 */
export const devRun = [
  EditorView.theme(
    {
      "&": {
        backgroundColor: "var(--card)",
        color: "#e6e6eb",
      },

      ".cm-content": {
        caretColor: "var(--primary)",
      },

      ".cm-cursor, .cm-dropCursor": {
        borderLeftColor: "var(--primary)",
      },

      "&.cm-focused .cm-selectionBackground, .cm-content ::selection": {
        backgroundColor: "rgba(120, 120, 150, 0.25)",
      },

      ".cm-activeLine": {
        backgroundColor: "rgba(255, 255, 255, 0.03)",
      },

      ".cm-gutters": {
        backgroundColor: "var(--card)",
        color: "rgb(120, 122, 128)",
        border: "none",
      },

      ".cm-activeLineGutter": {
        backgroundColor: "rgba(255, 255, 255, 0.03)",
      },

      // - Scrollbar -
      ".cm-scroller": {
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(201, 133, 255, 0.3) transparent",
      },
    },
    { dark: true },
  ),

  syntaxHighlighting(
    HighlightStyle.define([
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
    ]),
  ),
];
