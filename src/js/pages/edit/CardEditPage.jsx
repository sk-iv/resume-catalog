import * as React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'effector-react';
import slugify from 'slugify';
import { EditCardCommonForm, EditCardExperienceForm } from '../../features/editCardForm';
import Grid, { GridTile } from '../../ui/Grid';
import NavFlat from '../../features/navigation';
import { $user, getUser, updateUser } from '../../models';


const sections = [
  {
    label: 'Основная информация',
    component: 'EditCardCommonForm',
  },
  {
    label: 'Опыт',
    component: 'EditCardExperienceForm',
  },
];


const CardEditPage = ({ location, history, match: { params } }) => {
  React.useEffect(() => {
    // by default set hesh first in navigation
    if (!location.hash) {
      history.replace({
        pathname: location.pathname,
        hash: slugify(sections[0].label),
      });
    }

    getUser({ id: params.userId });
  }, [location]);

  const { loading, error, data } = useStore($user);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;
  if (params.userId && !data) return <p>Данные не загрузились</p>;

  const handlerSubmit = (payload) => updateUser(payload);

  const components = {
    EditCardCommonForm: <EditCardCommonForm submitCallback={handlerSubmit} values={params.userId ? data : null} />,
    EditCardExperienceForm: <EditCardExperienceForm />,
  };

  return (
    <Grid style={{ backgroundColor: '#fff' }}>
      <GridTile offset={10} size={3}>
        <NavFlat
          labels={sections.map(el=>el.label)}
          hash={location.hash}
          style={{ position: 'fixed' }}
          title={<h2 className="my-3">Редактирование профиля</h2>}
        />
      </GridTile>
      <GridTile offset={4} size={6} style={{ alignContent: 'center', flexDirection: 'column' }}>
        {
          sections.map((section) => (
            <section key={slugify(section.label)}>
              <a name={slugify(section.label)}><h2 className="py-4">{section.label}</h2></a>
              {components[section.component]}
            </section>
          ))
        }
      </GridTile>
    </Grid>
  );
};
export default CardEditPage;

EditCardCommonForm.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    replace: PropTypes.string
  }),
  params: PropTypes.shape({
    userId: PropTypes.string,
  }),
};
