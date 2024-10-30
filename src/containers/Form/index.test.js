import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from './index';

describe('When Form is created', () => {
  it('a list of fields is displayed', async () => {
    render(<Form />);
    await screen.findByText('Email');
    await screen.findByText('Nom');
    await screen.findByText('Prénom');
    await screen.findByText('Personel / Entreprise');
  });

  describe('and a click is triggered on the submit button', () => {
    it('the success action is called and confirmation message is displayed', async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      fireEvent.submit(screen.getByTestId('form-test-id'));

      await screen.findByText('En cours'); // Vérifie que l'état de chargement est affiché
      await waitFor(() => expect(onSuccess).toHaveBeenCalled()); // Vérifie que onSuccess est appelé
      await screen.findByText('Votre message a été envoyé avec succès !'); // Vérifie que le message de confirmation est affiché
    });
  });
});
