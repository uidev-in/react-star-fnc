import React, { useEffect, useState } from 'react';
import Star from './star';
import { Config } from './ReactStars.types';

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

const parentStyles = {
  overflow: 'hidden',
  position: 'relative',
};

const getHalfStarStyles = (color: string, uniqueness: string) => `
    .react-stars-${uniqueness}:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0; left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: ${color};
  }`;

const getHalfStarStyleForIcons = (color: string) => `
          span.react-stars-half > * {
          color: ${color};
      }`;

const iconsUsed = (newConfig: Config) =>
  (!newConfig.isHalf && newConfig.emptyIcon && newConfig.filledIcon) ||
  (newConfig.isHalf &&
    newConfig.emptyIcon &&
    newConfig.halfIcon &&
    newConfig.filledIcon);

export function ReactStars(props: Config) {
  const {
    edit = true,
    half = false,
    value = 0,
    count = 5,
    char = '★',
    size = 15,
    color = 'gray',
    activeColor = '#ffd700',
    a11y = true,
    onChange = () => {},
    classNames = '',
    isHalf = false,
  } = props;
  const [uniqueness, setUniqueness] = useState('');
  const [currentValue, setCurrentValue] = useState(0);
  const [stars, setStars] = useState<Array<{ active: boolean; id: string }>>(
    []
  );
  const isUsingIcons = iconsUsed(props);
  const [halfStarAt, setHalfStarAt] = useState(Math.floor(value || 0));
  const [halfStarHidden, setHalfStarHidden] = useState(
    isHalf && value % 1 < 0.5
  );

  const createUniqueness = () => {
    setUniqueness(`${Math.random()}`.replace('.', ''));
  };

  useEffect(() => {
    validateInitialValue(value, count);
    setStars(getStars(value));
    createUniqueness();
  }, []);

  const validateInitialValue = (innerValue: number, innerCount: number) => {
    if (innerValue < 0 || innerValue > innerCount) {
      setCurrentValue(0);
    } else {
      setCurrentValue(innerValue);
    }
  };

  const isDecimal = (innerValue: number) => innerValue % 1 === 0;

  const getRate = () =>
    isHalf ? Math.floor(currentValue) : Math.round(currentValue);

  const getStars = (activeCount?: number | undefined) => {
    if (typeof activeCount === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      activeCount = getRate();
    }

    const innerStars: Array<{ active: boolean; id: string }> = [];
    for (let i = 0; i < count; i++) {
      innerStars.push({
        active: i <= activeCount - 1,
        id: uid(),
      });
    }
    return innerStars;
  };

  const mouseOver = (event: React.MouseEvent) => {
    if (!edit) return;

    let index = Number(event.currentTarget.getAttribute('data-index'));

    if (props.isHalf) {
      // @ts-ignore
      const isAtHalf = moreThanHalf(event);
      setHalfStarHidden(isAtHalf);
      if (isAtHalf) index += 1;
      setHalfStarAt(index);
    } else {
      index += 1;
    }

    updateStars(index);
  };

  const updateStars = (index: number) => {
    const currentActive = stars.filter((x) => x.active);
    if (index !== currentActive.length) {
      setStars(getStars(index));
    }
  };

  const moreThanHalf = (event: MouseEvent) => {
    const { target } = event;
    const boundingClientRect = (target as HTMLElement).getBoundingClientRect();
    let mouseAt = event.clientX - boundingClientRect.left;
    mouseAt = Math.round(Math.abs(mouseAt));

    return mouseAt > boundingClientRect.width / 2;
  };

  function mouseLeave() {
    if (!edit) return;

    updateHalfStarValues(currentValue);
    setStars(getStars());
  }

  const updateHalfStarValues = (innerValue: number) => {
    if (isHalf) {
      setHalfStarHidden(isDecimal(innerValue));
      setHalfStarAt(Math.floor(innerValue));
    }
  };

  const onClick = (event: React.MouseEvent) => {
    if (!edit) return;

    let index = Number(event.currentTarget.getAttribute('data-index'));
    let innerValue;
    if (isHalf) {
      // @ts-ignore
      const isAtHalf = moreThanHalf(event);
      setHalfStarHidden(isAtHalf);
      if (isAtHalf) index += 1;
      innerValue = isAtHalf ? index : index + 0.5;
      setHalfStarAt(index);
    } else {
      index += 1;
      innerValue = index;
    }

    currentValueUpdated(innerValue);
  };

  const currentValueUpdated = (innerValue: number) => {
    if (innerValue !== currentValue) {
      setStars(getStars(innerValue));
      setCurrentValue(innerValue);
      onChange(innerValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!a11y && !edit) return;

    const { key } = event;
    let innerValue = currentValue;

    const keyNumber = Number(key); // e.g. "1" => 1, "ArrowUp" => NaN
    if (keyNumber) {
      if (Number.isInteger(keyNumber) && keyNumber > 0 && keyNumber <= count) {
        innerValue = keyNumber;
      }
    } else if (
      (key === 'ArrowUp' || key === 'ArrowRight') &&
      innerValue < count
    ) {
      event.preventDefault();

      innerValue += isHalf ? 0.5 : 1;
    } else if (
      (key === 'ArrowDown' || key === 'ArrowLeft') &&
      innerValue > 0.5
    ) {
      event.preventDefault();
      innerValue -= isHalf ? 0.5 : 1;
    }

    updateHalfStarValues(innerValue);

    currentValueUpdated(innerValue);
  };

  return (
    <div
      className={`react-stars-wrapper-${uniqueness}`}
      style={{ display: 'flex' }}
    >
      <div
        tabIndex={a11y && edit ? 0 : 1}
        aria-label="add rating by typing an integer from 0 to 5 or pressing arrow keys"
        onKeyDown={handleKeyDown}
        className={`react-stars ${classNames}`}
        style={parentStyles as React.CSSProperties}
        role="button"
      >
        {isHalf && (
          <style
            dangerouslySetInnerHTML={{
              __html: isUsingIcons
                ? getHalfStarStyleForIcons(activeColor)
                : getHalfStarStyles(activeColor, uniqueness),
            }}
          />
        )}
        {stars.map((star, i) => (
          <Star
            key={star.id}
            index={i}
            active={star.active}
            config={{
              ...props,
              edit,
              half,
              value,
              count,
              char,
              size,
              color,
              activeColor,
              a11y,
              onChange,
              classNames,
              isHalf,
            }}
            onMouseOver={mouseOver}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseLeave={mouseLeave}
            onClick={onClick}
            halfStarHidden={halfStarHidden}
            halfStarAt={halfStarAt}
            isUsingIcons={isUsingIcons}
            uniqueness={uniqueness}
          />
        ))}
        <p style={{ position: 'absolute', left: '-200rem' }} role="status">
          {currentValue}
        </p>
      </div>
    </div>
  );
}
