import React from 'react';
import { shallow } from 'enzyme';
import Timeline from './Timeline';

// jest -u -t=Timeline

const title = 'Test Title';
const units = [
  {
    from: 999302400,
    to: 1177977600,
    title: 'Магнитогорский государственный университет',
    subtitle: 'Графический дизайнер',
  },
  {
    from: 1204329600,
    to: 1259625600,
    title: 'Декретный отпуск',
  },
  {
    from: 1441065600,
    to: 1512086400,
    title: 'EVS',
    subtitle: 'Frontend-разработчик',
    text: 'Разработка клиентской части сайтов (JS + CSS + HTML); UI/UX дизайн;',
    accent: true,
  },
  {
    from: 1541030400,
    to: 'NOW_DATE',
    title: 'Грамотундра',
    subtitle: 'Frontend-разработчик',
    text: 'Разработка клиентской части сайта на (React + Apollo GraphQL + CSS);',
    accent: true,
  },
];

const wrapped = shallow(<Timeline units={units} width={500} />);

describe('Timeline', () => {
  it('should render the Timeline Component correctly', () => {
    expect(wrapped).toMatchSnapshot();
  });
});
