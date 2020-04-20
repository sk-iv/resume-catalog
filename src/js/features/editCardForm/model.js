import {
  checkAtLeastLength, checkIsfilled, parseOnlyLetterAndSpace, parseLength,
} from '../../ui/Input/services';

const editCardCommonModel = {
  name: {
    name: 'name',
    label: 'Имя Фамилия',
    type: 'text',
    parseFun: parseOnlyLetterAndSpace,
    validators: [{
      id: 'name-length',
      isValidFun: (expression) => checkAtLeastLength(expression, 3),
      error: 'Name is too short',
    }],
  },
  position: {
    name: 'position',
    label: 'Должность',
    type: 'text',
    validators: [{
      id: 'position-required',
      isValidFun: checkIsfilled,
      error: 'Position is empty',
    }],
  },
  localeDateOfBirth: {
    name: 'localeDateOfBirth',
    label: 'Дата рождения',
    type: 'text',
    validators: [{
      id: 'localeDateOfBirth-required',
      isValidFun: checkIsfilled,
      error: 'Date of bird is not selected',
    }],
  },
  interests: {
    name: 'interests',
    label: 'О себе',
    type: 'textarea',
    parseFun: (expression) => parseLength(expression, 2000),
  },
  skills: {
    name: 'skills',
    label: 'Навыки',
    type: 'text',
  },
};

export default editCardCommonModel;
