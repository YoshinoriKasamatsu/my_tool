export interface Control {
  id: string;
  inherited: true,
  label: string;
  controlType: string;
  readOnly: false,
  watermark: string;
  metadata: string;
  visible: boolean;
  isContribution: boolean;
}

export interface Group {
  id: string;
  inherited: boolean;
  label: string;
  isContribution: boolean;
  visible: boolean;
  controls: Control[];
}

export interface Section {
  id: string;
  groups: Group[]
}

export interface Page {
  id: string;
  inherited: boolean;
  label: string;
  pageType: string;
  locked: boolean,
  visible: boolean,
  isContribution: boolean,
  sections: Section[]
}

export interface SystemControl {
  id: string;
  label: string;
  controlType: string;
  readOnly: boolean,
  watermark: string;
  visible: boolean;
  isContribution: boolean;
}

export interface LayoutValue {
  pages: Page[];
  systemControls: SystemControl[]
}

export interface ProcessValue {
  referenceName: string;
  name: string;
  description: string;
  url: string;
  customization: string;
  color: string;
  icon: string;
  isDisabled: boolean;
  inherits: string | null,
  layout: LayoutValue;
}

export interface Process {
  count: number
  value: ProcessValue[]
}
