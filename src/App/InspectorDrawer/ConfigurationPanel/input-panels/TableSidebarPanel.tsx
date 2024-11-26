import React, { useState } from 'react';

//import { ToggleButton } from '@mui/material';
import { TableProps, TableDefaults, TablePropsSchema } from '../../../../lib/block-table';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import ColorInput from './helpers/inputs/ColorInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type TableSidebarPanelProps = {
  data: TableProps;
  setData: (v: TableProps) => void;
};

export default function TableSidebarPanel({ data, setData }: TableSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = TablePropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const headers = data.headers ?? TableDefaults.headers;
  const rows = data.rows ?? TableDefaults.rows;
  const borderColor = data.style?.borderColor ?? TableDefaults.style.borderColor;
  const borderWidth = data.style?.borderWidth ?? TableDefaults.style.borderWidth;
  const cellPadding = data.style?.cellPadding ?? TableDefaults.style.cellPadding;

  return (
    <BaseSidebarPanel title="Table block">
      <TextInput
        label="Headers (comma-separated)"
        defaultValue={headers.join(', ')}
        onChange={(value) => updateData({ ...data, headers: value.split(',').map((h) => h.trim()) })}
      />
      <TextInput
        label="Rows (semi-colon separated, comma within rows)"
        defaultValue={rows.map((row) => row.join(', ')).join('; ')}
        onChange={(value) =>
          updateData({
            ...data,
            rows: value.split(';').map((row) => row.split(',').map((cell) => cell.trim())),
          })
        }
      />
      <ColorInput
        label="Border color"
        defaultValue={borderColor}
        onChange={(borderColor) => updateData({ ...data, style: { ...data.style, borderColor } })}
      />
      <TextInput
        label="Border width (px)"
        defaultValue={borderWidth?.toString() ?? ''}
        onChange={(value) => updateData({ ...data, style: { ...data.style, borderWidth: parseInt(value, 10) } })}
      />
      <TextInput
        label="Cell padding (px)"
        defaultValue={cellPadding?.toString() ?? ''}
        onChange={(value) => updateData({ ...data, style: { ...data.style, cellPadding: parseInt(value, 10) } })}
      />
      <MultiStylePropertyPanel
        names={['backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
