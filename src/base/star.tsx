import React from 'react';
import { TStar } from './ReactStars.types';

const defaultStyles = {
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'block',
  float: 'left',
};

export default function Star(props: TStar) {
  const {
    index,
    active,
    config,
    onMouseOver,
    onMouseLeave,
    onClick,
    halfStarHidden,
    halfStarAt,
    isUsingIcons,
    uniqueness,
  } = props;

  const {
    color,
    activeColor,
    size,
    char,
    isHalf,
    edit,
    halfIcon,
    emptyIcon,
    filledIcon,
  } = config;

  let starClass = '';
  let half = false;

  if (isHalf && !halfStarHidden && halfStarAt === index) {
    if (!isUsingIcons) starClass = `react-stars-${uniqueness}`;
    else starClass = 'react-stars-half';
    half = true;
  }

  const style = {
    ...defaultStyles,
    color: active ? activeColor : color,
    cursor: edit ? 'pointer' : 'default',
    fontSize: `${size}px`,
  };

  const renderIcon = () => {
    if (!isUsingIcons) {
      return char;
    }

    if (active) {
      return filledIcon;
    }

    if (!active && half) {
      return halfIcon;
    }

    return emptyIcon;
  };

  return (
    <span
      className={starClass}
      style={style as React.CSSProperties}
      key={index}
      data-index={index}
      data-forhalf={filledIcon ? index : char}
      onMouseMove={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyUp={() => {}}
      role="button"
      tabIndex={0}
    >
      {renderIcon()}
    </span>
  );
}
