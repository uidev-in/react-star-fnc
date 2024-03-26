import React, { useEffect, useState } from 'react';

export const parentStyles = {
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
};

export type ReactStarsProps = {
  char?: string;
  className?: string;
  count?: number;
  edit?: boolean;
  half?: boolean;
  onChange: (val: number) => void;
  selectedColor?: string;
  size?: number;
  unSelectedColor?: string;
  value?: number;
};

const uniqueness = `${Math.random()}`.replace('.', '');

export const ReactStars = ({
  className = '',
  edit = true,
  half = true,
  value = 0,
  count = 5,
  char = '★',
  size = 15,
  unSelectedColor = 'gray', // color1
  selectedColor = '#ffd700', // color2
  onChange = () => {},
}: ReactStarsProps) => {
  const [halfStarAt, setHalfStarAt] = useState(Math.floor(value));
  const [newValue, setNewValue] = useState(value);
  const [halfStarHidden, setHalfStarHidden] = useState(half && value % 1 < 0.5);
  const [stars, setStars] = useState<Array<{ active: boolean; id: string }>>(
    []
  );

  const isDecimal = (valueInner: number) => valueInner % 1 !== 0;

  const getRate = () => {
    const starsInner = half ? Math.floor(value) : Math.round(value);
    return starsInner;
  };

  const getStars = (activeCount?: undefined | number) => {
    const getActiveCount =
      typeof activeCount === 'undefined' ? getRate() : activeCount;
    const starsInner: Array<{ active: boolean; id: string }> = [];
    for (let i = 0; i < count; i++) {
      starsInner.push({
        id: `${Math.random()}`.replace('.', ''),
        active: i <= getActiveCount - 1,
      });
    }
    return starsInner;
  };

  const moreThanHalf = (
    event: React.MouseEvent<HTMLSpanElement>,
    innerSize: number
  ) => {
    const { target } = event;
    // @ts-ignore
    let mouseAt = event.clientX - target.getBoundingClientRect().left;
    mouseAt = Math.round(Math.abs(mouseAt));
    return mouseAt > innerSize / 2;
  };

  const onMouseOver = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!edit) return;
    // @ts-ignore
    let index = Number(event.target.getAttribute('data-index'));
    if (half) {
      const isAtHalf = moreThanHalf(event, size);
      setHalfStarHidden(isAtHalf);
      if (isAtHalf) index += 1;
      setHalfStarAt(index);
    } else {
      index += 1;
    }
    setStars(getStars(index));
  };

  const onMouseLeave = () => {
    if (!edit) return;
    if (half) {
      setHalfStarHidden(!isDecimal(newValue));
      setHalfStarAt(Math.floor(newValue));
    }
    setStars(getStars(newValue));
  };

  const onClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!edit) return;
    // @ts-ignore
    let index = Number(event.target.getAttribute('data-index'));
    let valueInner;
    if (half) {
      const isAtHalf = moreThanHalf(event, size);
      setHalfStarHidden(isAtHalf);
      if (isAtHalf) index += 1;
      valueInner = isAtHalf ? index : index + 0.5;
      setHalfStarAt(index);
    } else {
      valueInner = index + 1;
      index = valueInner;
    }
    setStars(getStars(index));
    setNewValue(valueInner);
    onChange(valueInner);
  };
  const onKeyDown = () => {};

  useEffect(() => {
    const newStart = getStars(value);
    setStars(newStart);
  }, [value]);

  return (
    <>
      {half ? (
        <style>{`
        .react-stars-${uniqueness}{
          position: relative;
          overflow: hidden;
        }
        .react-stars-${uniqueness}::before {
          position: absolute;
          overflow: hidden;
          display: inline-block;
          z-index: 1;
          top: 0;
          left: 0;
          width: 50%;
          content: attr(data-forhalf);
          color: ${selectedColor};
      }`}</style>
      ) : null}
      <div className={className} style={parentStyles as React.CSSProperties}>
        {stars.map((star: { active: boolean; id: string }, index: number) => (
          <span
            className={
              half && !halfStarHidden && halfStarAt === index
                ? `react-stars-${uniqueness}`
                : ''
            }
            style={{
              color: star.active ? selectedColor : unSelectedColor,
              cursor: edit ? 'pointer' : 'default',
              fontSize: `${size}px`,
            }}
            key={`star-${star.id}`}
            data-index={index}
            data-forhalf={char}
            onMouseMove={onMouseOver}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            onKeyDown={onKeyDown}
            role="button"
            tabIndex={0}
          >
            {char}
          </span>
        ))}
      </div>
    </>
  );
};
