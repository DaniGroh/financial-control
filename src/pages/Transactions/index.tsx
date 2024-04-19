import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SearchForm } from "./components/SearchForm";
import * as S from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);
  return (
    <div>
      <Header />
      <Summary />
      <S.TransactionsContainer>
        <SearchForm />
        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <S.PriceHighLight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </S.PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  );
}
