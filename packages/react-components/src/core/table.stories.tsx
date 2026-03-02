import type { Meta } from '@storybook/react-vite';
import type { ElementType } from 'react';

import { Container } from '../components/container';

const meta = {
  title: 'Core/Table',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<ElementType<'table'>>;

export default meta;

export const Basic = () => (
  <Container dimension="medium">
    <table>
      <thead>
        <tr>
          <th>Caratteristiche Principali</th>
          <th>Sabbioso</th>
          <th>Argilloso</th>
          <th>Limoso</th>
          <th>Torboso</th>
          <th>Calcareo</th>
          <th>Ghiaioso</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Drenaggio</td>
          <td>Rapido</td>
          <td>Lento</td>
          <td>Buono</td>
          <td>Moderato</td>
          <td>Rapido</td>
          <td>Eccellente</td>
        </tr>
        <tr>
          <td>Nutrienti</td>
          <td>Povero</td>
          <td>Ricco</td>
          <td>Ricco</td>
          <td>Moderato</td>
          <td>Povero</td>
          <td>Povero</td>
        </tr>
        <tr>
          <td>Lavorabilità</td>
          <td>Facile</td>
          <td>Difficile</td>
          <td>Facile</td>
          <td>Moderata</td>
          <td>Facile</td>
          <td>Facile</td>
        </tr>
      </tbody>
    </table>
  </Container>
);
export const WithSeparators = () => (
  <Container dimension="medium">
    <table data-table-separators>
      <thead>
        <tr>
          <th>Caratteristiche Principali</th>
          <th>Sabbioso</th>
          <th>Argilloso</th>
          <th>Limoso</th>
          <th>Torboso</th>
          <th>Calcareo</th>
          <th>Ghiaioso</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Drenaggio</td>
          <td>Rapido</td>
          <td>Lento</td>
          <td>Buono</td>
          <td>Moderato</td>
          <td>Rapido</td>
          <td>Eccellente</td>
        </tr>
        <tr>
          <td>Nutrienti</td>
          <td>Povero</td>
          <td>Ricco</td>
          <td>Ricco</td>
          <td>Moderato</td>
          <td>Povero</td>
          <td>Povero</td>
        </tr>
        <tr>
          <td>Lavorabilità</td>
          <td>Facile</td>
          <td>Difficile</td>
          <td>Facile</td>
          <td>Moderata</td>
          <td>Facile</td>
          <td>Facile</td>
        </tr>
      </tbody>
    </table>
  </Container>
);

export const Scrollable = () => (
  <Container dimension="small" style={{ overflowX: 'auto' }}>
    <table data-table-separators>
      <thead>
        <tr>
          <th>Caratteristiche Principali</th>
          <th>Sabbioso</th>
          <th>Argilloso</th>
          <th>Limoso</th>
          <th>Torboso</th>
          <th>Calcareo</th>
          <th>Ghiaioso</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Drenaggio</td>
          <td>Rapido</td>
          <td>Lento</td>
          <td>Buono</td>
          <td>Moderato</td>
          <td>Rapido</td>
          <td>Eccellente</td>
        </tr>
        <tr>
          <td>Nutrienti</td>
          <td>Povero</td>
          <td>Ricco</td>
          <td>Ricco</td>
          <td>Moderato</td>
          <td>Povero</td>
          <td>Povero</td>
        </tr>
        <tr>
          <td>Lavorabilità</td>
          <td>Facile</td>
          <td>Difficile</td>
          <td>Facile</td>
          <td>Moderata</td>
          <td>Facile</td>
          <td>Facile</td>
        </tr>
      </tbody>
    </table>
  </Container>
);
