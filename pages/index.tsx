import type { GetServerSideProps, NextPage } from "next";
import Items from "../components/Items";
import { fetchItems } from "../util/fetchItems";
import Layout from "../components/Layout";

interface Props {
  items: Item[];
}

const Home: NextPage<Props> = ({ items }: Props) => {
  return (
    <Layout title="ホーム" is760={true}>
      <div className="min-w-[760px] top-0 bg-gray-200">
        <h1 className="w-44 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
          人気の商品
        </h1>
        <Items items={items} />
        <h1 className="w-44 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
          新しい商品
        </h1>
        <Items items={items} />
      </div>
    </Layout>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const items = await fetchItems();
  return {
    props: {
      items,
    },
  };
};
