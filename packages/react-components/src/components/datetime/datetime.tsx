'use client';

import {
  ComponentPropsWithRef,
  FC, useMemo,
} from 'react';

export type DatetimeProps = ComponentPropsWithRef<'time'> & {
  /**
   * The date to format and display.
   */
  date: string;
  /**
   * Set the locale to use to format the date.
   */
  locale?: string | string[];
  /**
   * Customize the date format by passing options from Intl.DateTimeFormat
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   */
  options?: Intl.DateTimeFormatOptions;
}

const defaultOptions: Partial<Intl.DateTimeFormatOptions> = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const Datetime: FC<DatetimeProps> = ({
  date,
  locale = 'en-US',
  options,
  ...otherProps
}) => {
  const hasDateTimeStyle = useMemo(() => options?.timeStyle ?? options?.dateStyle, [options]);
  const humanDate = useMemo(() => {
    const timeDate: Date = new Date(date);
    return new Intl.DateTimeFormat(
      locale, hasDateTimeStyle ? { ...options } : { ...defaultOptions, ...options },
    ).format(timeDate);
  }, [date, hasDateTimeStyle, locale, options]);

  return (
    <time dateTime={date} {...otherProps}>
      {humanDate}
    </time>
  );
};
