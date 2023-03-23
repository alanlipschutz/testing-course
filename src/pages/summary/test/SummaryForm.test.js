import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('test in page SummaryForm', () => {
  test('checkbox is unchecked by default', async () => {
    render(<SummaryForm />);
    const user = userEvent.setup();
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();
    const button = screen.getByRole('button', { name: /order/i });
    expect(button).toBeDisabled();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('popoever responds to hover', async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const nullPopoever = screen.queryByText(/ice cream will actually/i);
    expect(nullPopoever).not.toBeInTheDocument();

    const terms = screen.getByText(/terms/i);

    await user.hover(terms);
    const popoever = screen.getByText(/ice cream will actually/i);
    expect(popoever).toBeInTheDocument();

    await user.unhover(terms);
    expect(popoever).not.toBeInTheDocument();
  });
});
