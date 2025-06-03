import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FxControlPanel from "./FxControlPanel";
import { type StateFx } from "../../types/Fx";

describe("FxControlPanel", () => {
  const mockCloseModal = vi.fn();
  vi.mock('../TurnableKnob/TurnableKnob', () => ({
  default: () => <div data-testid="mock-knob" />,
}));

  const mockSetters = [vi.fn(), vi.fn()];
  const mockStateFx: StateFx = { id: "fx1", name: "Reverb" };
  const mockParams = [
    { name: "Decay", value: 0.5, min: 0, max: 1 },
    { name: "Mix", value: 0.25, min: 0, max: 1 },
  ];

  beforeEach(() => {
    mockCloseModal.mockClear();
    mockSetters.forEach(fn => fn.mockClear());
  });

  it("renders the modal with the correct title and parameters", () => {
    render(
      <FxControlPanel
        stateFx={mockStateFx}
        setters={mockSetters}
        params={mockParams}
        closeModal={mockCloseModal}
      />
    );

    expect(screen.getByText("Reverb")).toBeInTheDocument();
    expect(screen.getByText("Decay")).toBeInTheDocument();
    expect(screen.getByText("Mix")).toBeInTheDocument();
    expect(screen.getByText("0.50")).toBeInTheDocument();
    expect(screen.getByText("0.25")).toBeInTheDocument();
  });

  it("calls closeModal when clicking outside the modal", () => {
    const { container } = render(
      <FxControlPanel
        stateFx={mockStateFx}
        setters={mockSetters}
        params={mockParams}
        closeModal={mockCloseModal}
      />
    );

    fireEvent.mouseDown(container); // Click on backdrop
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("does not call closeModal when clicking inside the modal", () => {
    render(
      <FxControlPanel
        stateFx={mockStateFx}
        setters={mockSetters}
        params={mockParams}
        closeModal={mockCloseModal}
      />
    );

    const modalContent = screen.getByText("Reverb");
    fireEvent.mouseDown(modalContent); // Click inside modal
    expect(mockCloseModal).not.toHaveBeenCalled();
  });
});
