import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import * as S from "./styles";
import { api } from "../../lib/axios";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});

type newTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionsModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: newTransactionFormInputs) {
    const { description, price, category, type } = data;
    await api.post("/transactions", {
      description,
      price,
      category,
      type,
    });
  }

  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <S.CloseButton>
          <X />
        </S.CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <S.TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <S.TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </S.TransactionTypeButton>
                  <S.TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </S.TransactionTypeButton>
                </S.TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </S.Content>
    </Dialog.Portal>
  );
}
