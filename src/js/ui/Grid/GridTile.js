import styled from 'styled-components';

const GridTile = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'offset'].includes(prop),
})`
display: flex;
flex-wrap: wrap;
${({
    size,
    offset,
  }) => `
grid-column-start: ${offset ? `col-start ${offset}` : 'col-start 1'};
grid-column-end: ${size ? `span ${size}` : 'span 12'};
grid-row-start: auto;
grid-row-end: auto;
`}`;
export default GridTile;
