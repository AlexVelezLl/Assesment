import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import CreateProduct from '../../../components/pages/CreateProduct';

import Services from '../../../services';

Services.instance = {
  createProduct: jest.fn()
};

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children
}));

window.alert = jest.fn();

describe("Create Product component", () => {
  test("renders without crashing", async () => {
    render(<CreateProduct />);
    await waitFor(() => {
      expect(true).toBe(true); // If app crash wont reach this line
    });
  });

  describe("Fields validation", () => {
    test("Should not call createProduct on empty form", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        screen.getByText("Registrar").click();
        expect(Services.instance.createProduct).not.toHaveBeenCalled();
      });
    });

    test("Register button should be disabled when errors are present", async () => {
      render(<CreateProduct />);
      screen.getByText("Registrar").click();
      // Now errors are present
      await waitFor(() => {
        expect(screen.getByText("Registrar")).toBeDisabled();
      });
    });

    describe("ID Validation", () => {
      test("Should show error if productId is empty", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("ID").focus();
          screen.getByLabelText("ID").blur();
          expect(screen.getByText("¡ID no válido!")).toBeInTheDocument();
        });
      });

      test("Should show error if productId is less than 3 characters", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("ID").focus();
          screen.getByLabelText("ID").value = "12";
          screen.getByLabelText("ID").blur();
          expect(screen.getByText("¡ID no válido!")).toBeInTheDocument();
        });
      });

      test("Should show error if productId is more than 10 characters", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("ID").focus();
          screen.getByLabelText("ID").value = "12345678910";
          screen.getByLabelText("ID").blur();
          expect(screen.getByText("¡ID no válido!")).toBeInTheDocument();
        });
      });

      test("Should not call createProduct if productId has errors", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("ID").focus();
          screen.getByLabelText("ID").value = "12345678910";
          screen.getByLabelText("ID").blur();
          screen.getByText("Registrar").click();
          expect(Services.instance.createProduct).not.toHaveBeenCalled();
        });
      });

      test("Shouldnt show error if productId is valid", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("ID").focus();
          screen.getByLabelText("ID").value = "123456789";
          screen.getByLabelText("ID").blur();
          expect(screen.queryByText("¡ID no válido!")).not.toBeInTheDocument();
        });
      });
    });

    describe("Name Validation", () => {
      test("Should show error if productName is empty", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Nombre").focus();
          screen.getByLabelText("Nombre").blur();
          expect(screen.getByText("¡Nombre no válido!")).toBeInTheDocument();
        });
      });

      test("Should show error if productName is less than 5 characters", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Nombre").focus();
          screen.getByLabelText("Nombre").value = "1234";
          screen.getByLabelText("Nombre").blur();
          expect(screen.getByText("¡Nombre no válido!")).toBeInTheDocument();
        });
      });

      test("Should show error if productName is more than 100 characters", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Nombre").focus();
          screen.getByLabelText("Nombre").value = "12345678910123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910123456789";
          screen.getByLabelText("Nombre").blur();
          expect(screen.getByText("¡Nombre no válido!")).toBeInTheDocument();
        });
      });

      test("Should not call createProduct if productName has errors", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Nombre").focus();
          screen.getByLabelText("Nombre").value = "12345678910123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910123456789";
          screen.getByLabelText("Nombre").blur();
          screen.getByText("Registrar").click();
          expect(Services.instance.createProduct).not.toHaveBeenCalled();
        });
      });

      test("Shouldnt show error if productName is valid", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Nombre").focus();
          screen.getByLabelText("Nombre").value = "123456789";
          screen.getByLabelText("Nombre").blur();
          expect(screen.queryByText("¡Nombre no válido!")).not.toBeInTheDocument();
        });
      });
    });

    describe("Description Validation", () => {
      test("Should show error if productDescription is empty", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Descripción").focus();
          screen.getByLabelText("Descripción").blur();
          expect(screen.getByText("¡Descripción no válida!")).toBeInTheDocument();
        });
      });

      test("Should show error if productDescription is less than 10 characters", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Descripción").focus();
          screen.getByLabelText("Descripción").value = "123456789";
          screen.getByLabelText("Descripción").blur();
          expect(screen.getByText("¡Descripción no válida!")).toBeInTheDocument();
        });
      });

      test("Should show error if productDescription is more than 200 characters", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Descripción").focus();
          screen.getByLabelText("Descripción").value = "123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910123";
          screen.getByLabelText("Descripción").blur();
          expect(screen.getByText("¡Descripción no válida!")).toBeInTheDocument();
        });
      });

      test("Should not call createProduct if productDescription has errors", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Descripción").focus();
          screen.getByLabelText("Descripción").value = "123";
          screen.getByLabelText("Descripción").blur();
          screen.getByText("Registrar").click();
          expect(Services.instance.createProduct).not.toHaveBeenCalled();
        });
      });

      test("Shouldnt show error if productDescription is valid", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Descripción").focus();
          screen.getByLabelText("Descripción").value = "123456789";
          screen.getByLabelText("Descripción").blur();
          expect(screen.queryByText("¡Descripción no válida!")).not.toBeInTheDocument();
        });
      });
    });

    describe("Logo Validation", () => {
      test("Should show error if productLogo is empty", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Logo").focus();
          screen.getByLabelText("Logo").blur();
          expect(screen.getByText("¡Url invalida!")).toBeInTheDocument();
        });
      });

      test("Should show error if productLogo is invalid", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Logo").focus();
          screen.getByLabelText("Logo").value = "123456789";
          screen.getByLabelText("Logo").blur();
          expect(screen.getByText("¡Url invalida!")).toBeInTheDocument();
        });
      });

      test("Should not call createProduct if productLogo has errors", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Logo").focus();
          screen.getByLabelText("Logo").value = "123456789";
          screen.getByLabelText("Logo").blur();
          screen.getByText("Registrar").click();
          expect(Services.instance.createProduct).not.toHaveBeenCalled();
        });
      });

      test("Shouldnt show error if productLogo is valid", async () => {
        render(<CreateProduct />);
        await waitFor(() => {
          screen.getByLabelText("Logo").focus();
          screen.getByLabelText("Logo").value = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
          screen.getByLabelText("Logo").blur();
          expect(screen.queryByText("¡Url invalida!")).not.toBeInTheDocument();
        });
      });
    });
  });

  describe("Reset button", () => {
    test("Reset button should be disabled if form and errors are empty", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        expect(screen.getByText("Reiniciar")).toBeDisabled();
      });
    });

    test("Reset button should be enabled if form has values", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        screen.getByLabelText("ID").focus();
        screen.getByLabelText("ID").value = "123456789";
        screen.getByLabelText("ID").blur();
        expect(screen.getByText("Reiniciar")).toBeEnabled();
      });
    });

    test("Reset button should be enabled if form has errors", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        screen.getByLabelText("ID").focus();
        screen.getByLabelText("ID").blur();
        expect(screen.getByText("Reiniciar")).toBeEnabled();
      });
    });

    test("Reset button should reset form values", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        screen.getByLabelText("ID").focus();
        screen.getByLabelText("ID").value = "123456789";
        screen.getByLabelText("ID").blur();
        screen.getByText("Reiniciar").click();
      });
      await waitFor(() => {
        expect(screen.getByLabelText("ID").value).toBe("");
      });
    });

    test("Reset button should reset form errors", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        screen.getByLabelText("ID").focus();
        screen.getByLabelText("ID").blur();
      });
      await waitFor(() => {
        screen.getByText("Reiniciar").click();
      });
      await waitFor(() => {
        expect(screen.queryByText("¡ID no válido!")).not.toBeInTheDocument();
      });
    });
  });

  describe("Submit form", () => {
    test("Should call createProduct on submit", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        fireEvent.change(screen.getByLabelText("ID"), { target: { value: "123456789" } });
        fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "123456789" } });
        fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: "12345678910" } });
        fireEvent.change(screen.getByLabelText("Logo"), { target: { value: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" } });
        fireEvent.change(screen.getByLabelText("Fecha Liberación"), { target: { value: "2024-01-01" } });
      });
      await waitFor(() => {
        screen.getByText("Registrar").click();
      });
      await waitFor(() => {
        expect(Services.instance.createProduct).toHaveBeenCalled();
      });
    });

    test("Should show alert on submit success", async () => {
      render(<CreateProduct />);
      await waitFor(() => {
        fireEvent.change(screen.getByLabelText("ID"), { target: { value: "123456789" } });
        fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "123456789" } });
        fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: "12345678910" } });
        fireEvent.change(screen.getByLabelText("Logo"), { target: { value: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" } });
        fireEvent.change(screen.getByLabelText("Fecha Liberación"), { target: { value: "2024-01-01" } });
      });
      await waitFor(() => {
        screen.getByText("Registrar").click();
      });
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalled();
      });
    });

    test("Should have sent the correct payload", async () => {
      const data = {
        id: "123456789",
        name: "123456788",
        description: "12345678910",
        logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        releaseDate: "2024-01-01",
        revisionDate: "2025-01-01"
      };
      render(<CreateProduct />);
      await waitFor(() => {
        fireEvent.change(screen.getByLabelText("ID"), { target: { value: data.id } });
        fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: data.name } });
        fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: data.description } });
        fireEvent.change(screen.getByLabelText("Logo"), { target: { value: data.logo } });
        fireEvent.change(screen.getByLabelText("Fecha Liberación"), { target: { value: data.releaseDate } });
      });
      await waitFor(() => {
        screen.getByText("Registrar").click();
      });
      await waitFor(() => {
        expect(Services.instance.createProduct).toHaveBeenCalledWith(data);
      });
    });
  });
});
