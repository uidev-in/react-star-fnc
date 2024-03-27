import React from 'react';

export type Config = {
  a11y?: boolean;
  activeColor?: string;
  char?: string;
  classNames?: string;
  color?: string;
  count: number;
  edit?: boolean;
  emptyIcon?: React.ReactNode;
  filledIcon?: React.ReactNode;
  half?: boolean;
  halfIcon?: React.ReactNode;
  isHalf?: boolean;
  onChange?: (value: number) => void;
  size?: number;
  value?: number;
};

export type TStar = {
  active: boolean;
  config: Partial<Config>;
  halfStarAt?: number;
  halfStarHidden?: boolean;
  index: number;
  isUsingIcons?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseOver: (e: React.MouseEvent<HTMLSpanElement>) => void;
  uniqueness?: string;
};
