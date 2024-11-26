import { z } from 'zod';
import React, { CSSProperties } from 'react';

export const TablePropsSchema = z.object({
  headers: z.array(z.string()), // Array of column headers
  rows: z.array(z.array(z.string())), // 2D array for table rows
  style: z
    .object({
      borderColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().nullable(),
      borderWidth: z.number().min(0).optional().nullable(),
      cellPadding: z.number().min(0).optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type TableProps = z.infer<typeof TablePropsSchema>;

export const TableDefaults = {
  headers: [],
  rows: [],
  style: {
    borderColor: '#cccccc',
    borderWidth: 1,
    cellPadding: 8,
  },
};


export function Table({ headers, rows, style }: TableProps) {
  const tableStyle: CSSProperties = {
    borderCollapse: 'collapse',
    width: '100%',
    border: `${style?.borderWidth ?? TableDefaults.style.borderWidth}px solid ${style?.borderColor ?? TableDefaults.style.borderColor}`,
  };

  const cellStyle: CSSProperties = {
    border: `${style?.borderWidth ?? TableDefaults.style.borderWidth}px solid ${style?.borderColor ?? TableDefaults.style.borderColor}`,
    padding: `${style?.cellPadding ?? TableDefaults.style.cellPadding}px`,
    textAlign: 'left',
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {headers?.map((header, index) => (
            <th key={index} style={cellStyle}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row?.map((cell, cellIndex) => (
              <td key={cellIndex} style={cellStyle}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}