import { useState } from 'react';
import { Config } from '../ReactStars.types';

export default function useConfig(config: Config) {
  const [count, setCount] = useState(config.count);
  const [size, setSize] = useState(config.size);
  const [char, setChar] = useState(config.char);
  const [color, setColor] = useState(config.color);
  const [activeColor, setActiveColor] = useState(config.activeColor);
  const [isHalf, setIsHalf] = useState(config.isHalf);
  const [edit, setEdit] = useState(config.edit);
  const [emptyIcon, setEmptyIcon] = useState(config.emptyIcon);
  const [halfIcon, setHalfIcon] = useState(config.halfIcon);
  const [filledIcon, setFilledIcon] = useState(config.filledIcon);
  const [a11y, setA11y] = useState(config.a11y);

  const configObj = {
    count,
    size,
    char,
    color,
    activeColor,
    isHalf,
    edit,
    emptyIcon,
    halfIcon,
    filledIcon,
    a11y,
  };

  const setConfig = (newConfig: Config) => {
    setCount(newConfig.count);
    setSize(newConfig.size);
    setChar(newConfig.char);
    setColor(newConfig.color);
    setActiveColor(newConfig.activeColor);
    setIsHalf(newConfig.isHalf);
    setEdit(newConfig.edit);
    setEmptyIcon(newConfig.emptyIcon);
    setHalfIcon(newConfig.halfIcon);
    setFilledIcon(newConfig.filledIcon);
    setA11y(newConfig.a11y);
  };

  return [configObj, setConfig];
}
