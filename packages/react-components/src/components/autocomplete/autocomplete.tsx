import { FCChildrenClass } from '@/components/types';

import styles from './autocomplete.module.css';

export type AutocompleteProps = Record<string, unknown>

export const Autocomplete: FCChildrenClass<AutocompleteProps> = () => (
  <div
    className={styles.Autocomplete}
  >
    dio
  </div>
);
