import Layout from '../../components/Layout'
import SearchField from '../../components/SearchField'
import { SearchPageContainer } from './styles'

const SearchPage = () => {
  return (
    <Layout page="search">
      <SearchPageContainer>
        <SearchField />
      </SearchPageContainer>
    </Layout>
  )
}

export default SearchPage
