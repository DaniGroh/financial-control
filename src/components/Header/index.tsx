import logoImg from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import * as S from "./styles";
import { NewTransactionsModal } from "../NewTransactionModal";

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.Logo>
          <img src={logoImg} alt="" />
          <span>Financial Control</span>
        </S.Logo>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova Transação</S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionsModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}
