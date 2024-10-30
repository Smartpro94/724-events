import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Field, { FIELD_TYPES } from '../../components/Field';
import Select from '../../components/Select';
import Button, { BUTTON_TYPES } from '../../components/Button';

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Nouvel état pour le message de confirmation

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setSuccessMessage(''); // Réinitialiser le message de succès avant l'envoi

      try {
        await mockContactApi();
        setSending(false);
        setSuccessMessage('Votre message a été envoyé avec succès !'); // Affichage du message de confirmation
        onSuccess(); // Appeler la fonction onSuccess
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact} data-testid="form-test-id">
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={['Personel', 'Entreprise']}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={sending}
            data-testid="button-test-id"
          >
            {sending ? 'En cours' : 'Envoyer'}
          </Button>
          {successMessage && <p>{successMessage}</p>}{' '}
          {/* Afficher le message de confirmation */}
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
