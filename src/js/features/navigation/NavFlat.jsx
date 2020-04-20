import * as React from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import List, {
  ListItem, ListItemText,
} from '../../ui/List';

const NavFlat = ({
  labels, hash, title, className, style
}) => (
  <List dense={false} className={className} style={style}>
    {title && title}
    {
        labels.map((j) => {
          const slug = slugify(j);
          return (
            <ListItem key={slug} button component="a" selected={`#${slug}` === hash} href={`#${slug}`}>
              <ListItemText
                primary={j}
              />
            </ListItem>
          );
        })
      }
  </List>
);
export default NavFlat;

NavFlat.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  hash: PropTypes.string,
  title: function(props, propName, componentName) {
    if (!/[h2]+/.test(props[propName].type)) {
      return new Error(
        'Проп `' + propName + '` компонента' +
        ' `' + componentName + '` имеет неправильное значение'
      );
    }
  },
  className: PropTypes.string,
  style: PropTypes.shape({
    position: PropTypes.string
  }),
};
