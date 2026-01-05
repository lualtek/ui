/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import { Checkbox } from '@/components';

import styles from './table-checkbox.module.css';

export const TableCheckbox = ({ ...otherProps }) => (
  <Checkbox
    className={styles.TableCheckbox}
    dimension="small"
    {...otherProps}
  />
);
