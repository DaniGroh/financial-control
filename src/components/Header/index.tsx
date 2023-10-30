import logoImg from '../../assets/logo.svg'
import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.Logo>
          <img src={logoImg} alt="" />
          <span>Financial Control</span>
        </S.Logo>
        <S.NewTransactionButton>Nova Transação</S.NewTransactionButton>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}