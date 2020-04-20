import * as React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { useForm } from '../../ui/Form';
import TextField, { ChipInput } from '../../ui/TextField';
import { InputAdornment } from '../../ui/Input';
import Tooltip from '../../ui/Tooltip';
import { SvgUse } from '../../ui/SvgIcon';
import editCardCommonModel from './model';

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

const TextMaskDate = (props) => (
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

const EditCardCommonForm = ({ submitCallback, values }) => {
  const [inputs, setInputs, setSubmit] = useForm(editCardCommonModel, submitCallback, values);

  return (


    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        {...inputs.name}
        value={inputs.name.value || ''}
        onChange={setInputs}
        onDebounce={submitCallback}
        className="w-100"
        style={{ maxWidth: '300px' }}
        margin="normal"
      />
      <TextField
        {...inputs.position}
        value={inputs.position.value || ''}
        onChange={setInputs}
        onDebounce={submitCallback}
        className="w-100"
        style={{ maxWidth: '300px' }}
        margin="normal"
      />
      <TextField
        {...inputs.localeDateOfBirth}
        value={inputs.localeDateOfBirth.value || ''}
        onChange={setInputs}
        onDebounce={submitCallback}
        className="w-100"
        style={{ maxWidth: '300px' }}
        margin="normal"
        InputProps={{
          inputComponent: TextMaskDate,
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        {...inputs.interests}
        value={inputs.interests?.value || ''}
        onChange={setInputs}
        onDebounce={submitCallback}
        multiline
        rows="4"
        className="w-100"
        style={{ maxWidth: '300px' }}
        margin="normal"
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <Tooltip title="Markdown">
              <div className="text-muted icon-box">
                <SvgUse name="markdown" />
              </div>
            </Tooltip>
          </InputAdornment>,
        }}
      />
      <ChipInput
        onChange={(chips) => handleChange(chips)}
        onAdd={(chip) => {}}
        style={{ maxWidth: '300px' }}
        label="Навыки"
        value={['react', 'js', 'css', 'html', 'apollo', 'graphql', 'effector', 'jest/enzyme']}
      />
    </div>


  );
};
export default EditCardCommonForm;

EditCardCommonForm.propTypes = {
  submitCallback: PropTypes.func,
  values: PropTypes.array
};
