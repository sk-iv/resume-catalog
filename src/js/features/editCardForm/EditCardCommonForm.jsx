import * as React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
// import { useForm } from '../../ui/Form';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import TextField from '../../ui/TextField';
import { InputAdornment } from '../../ui/Input';
import Tooltip from '../../ui/Tooltip';
import { SvgUse } from '../../ui/SvgIcon';
import Button from '../../ui/Button';
import {
  checkAtLeastLength,
} from '../../ui/Input/services';

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

const TextMaskDate = ({ inputRef, ...props }) => (
  <MaskedInput
    {...props}
    mask={[/[0-3]/, /\d/, '.', /[0-1]/, /\d/, '.', /[0-2]/, /\d/, /\d/, /\d/]}
    placeholderChar={'\u005f'}
    pipe={autoCorrectedDatePipe}
    guide
    keepCharPositions
    showMask
  />
);

const colourOptions = [
  { value: 'react', label: 'react' },
  { value: 'js', label: 'js' },
  { value: 'css', label: 'css' },
  { value: 'html', label: 'html' },
  { value: 'redux', label: 'redux' },
  { value: 'jest/enzyme', label: 'jest/enzyme' },
];
const EditCardCommonForm = ({ values, submitCallback }) => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, control, errors } = methods;
  const onSubmit = (data) => submitCallback({ id: '25lk78', ...data });
  console.log('control', control)
  return (

    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <Controller
        as={TextField}
        name="name"
        control={control}
        rules={{
          // required: {
          //   value: true,
          //   message: 'Phone number is required',
          // },
          // minLength: {
          //   value: 12,
          //   message: 'Phone number should be minimum length of 12',
          // },
          validate: (value) => {
            if (checkAtLeastLength(value, 30)) {
              return 'Не должно превышать более 30 символов';
            }
          },
        }}
        defaultValue={values?.name || ''}
        type="text"
        label="Имя Фамилия"
        helperText={errors?.name?.message}
        error={!!(errors?.name)}
        className="w-100 mx-auto"
        style={{ maxWidth: '300px' }}
        margin="normal"
      />
      <Controller
        as={TextField}
        control={control}
        name="position"
        label="Должность"
        type="text"
        defaultValue={values?.position || ''}
        error={!!(errors.position)}
        className="w-100 mx-auto"
        style={{ maxWidth: '300px' }}
        margin="normal"
      />
      <Controller
        as={TextField}
        control={control}
        name="localeDateOfBirth"
        label="Дата рождения"
        type="text"
        defaultValue={values?.localeDateOfBirth || ''}
        error={!!(errors.localeDateOfBirth)}
        className="w-100 mx-auto"
        style={{ maxWidth: '300px' }}
        margin="normal"
        InputProps={{
          inputComponent: TextMaskDate,
        }}
        InputLabelProps={{ shrink: true }}
      />
      <Controller
        as={TextField}
        control={control}
        name="interests"
        label="О себе"
        type="textarea"
        defaultValue={values?.interests || ''}
        error={!!(errors.interests)}
        multiline
        rows="4"
        className="w-100 mx-auto"
        style={{ maxWidth: '300px' }}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Markdown">
                <div className="text-muted icon-box">
                  <SvgUse name="markdown" />
                </div>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <Controller
        as={(
          <CreatableSelect
            isMulti
            options={colourOptions || []}
          />
        )}
        control={control}
        rules={{ required: true }}
        name="skills"
        defaultValue={values?.skills.map((j) => ({ label: j })) || []}
      />

      <Button color="secondary" onClick={handleSubmit(onSubmit)} className="mt-3">Сохранить</Button>
    </form>

  );
};
export default EditCardCommonForm;

EditCardCommonForm.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  submitCallback: PropTypes.func,
};
