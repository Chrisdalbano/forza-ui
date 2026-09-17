export interface ForzaOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}
export interface ForzaAccordionItem {
  value: string;
  title: string;
  content?: string;
  disabled?: boolean;
}
export interface ForzaStep {
  title: string;
  description?: string;
  disabled?: boolean;
}
export interface ForzaMenuItem {
  value: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
}
export interface ForzaColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "start" | "end";
}
export interface ForzaSort {
  key: string;
  direction: "asc" | "desc";
}
