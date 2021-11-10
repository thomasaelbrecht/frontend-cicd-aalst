import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';

const validationRules = {
  email: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Login() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-1/4">
        <form className="grid grid-cols-1 gap-y-4">
          <LabelInput
            label="E-mail"
            type="email"
            defaultValue=""
            placeholder="your@email.com"
            validation={validationRules.email} />

          <LabelInput
            label="Wachtwoord"
            type="password"
            defaultValue=""
            validation={validationRules.password} />
        </form>
      </div>
    </FormProvider>
  );
}
