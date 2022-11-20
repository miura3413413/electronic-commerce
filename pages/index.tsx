import type { GetServerSideProps, NextPage } from 'next'
import Items from '../components/Items';
import { fetchItems } from '../util/fetchItems';
import Layout from '../components/Layout';

interface Props {
  items: Item[]
}

const Home: NextPage<Props> = ({items}: Props) => {
  console.log(items)
  return (
    <Layout title="ホーム">
      <div className='min-h-screen top-0 bg-gray-200'>
        <Items title={"人気の商品"} items={items}/>
        <Items title={"新しい商品"} items={items}/>
        <Items title={"期間限定"} items={items}/>

      </div>

    </Layout>
  )
  }
export default Home

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const items = await fetchItems()
  return {
    props: {
      items
    },
  };
}