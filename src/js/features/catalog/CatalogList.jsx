import * as React from 'react';
import { CatalogContext } from './CatalogContext';
import PreviewCard from '../cards/PreviewCard';
import timeDiff from '../../lib/timeDiff';


const CatalogList = () => {
  const users = React.useContext(CatalogContext);

  return (


    users.map((el) => (
      <PreviewCard
        key={el.id}
        id={el.id}
        img={el.img}
        title={el.name}
        subtitle={el.position}
        text={`${timeDiff(new Date(el.dateOfBirth * 1000), new Date()).years} • ${el.city}\n\n${el.interests}`}
        chips={el.skills}
        units={el.units}
      />
    ))


  );
};
export default CatalogList;
