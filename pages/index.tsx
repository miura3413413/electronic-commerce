import type { GetServerSideProps, NextPage } from "next";
import SlideItems from "../components/SlideItems";
import { fetchItems } from "../util/fetchItems";
import Layout from "../components/Layout";
import RowItems from "../components/RowItems";

interface Props {
  items: Item[];
}

const Home: NextPage<Props> = ({ items }: Props) => {
  const furItem = items.slice(items.length - 3);
  return (
    <Layout title="ホーム" is760={true}>
      <div className="min-w-[760px] top-0 bg-gray-200">
        <h1 className="w-36 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
          人気の商品
        </h1>
        <SlideItems items={items} />
        <h1 className="w-36 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
          新しい商品
        </h1>
        <SlideItems items={items} />
        <div className=" md:flex">
          <div>
            <h1 className="w-36 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
              大きい
            </h1>
            <RowItems items={items} isRow={true} />
          </div>
          <div>
            <h1 className="w-36 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
              期間限定
            </h1>
            <RowItems items={items} isRow={true} />
          </div>
        </div>

        <div className="flex">
          <div>
            <div className="">
              <h1 className="w-36 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
                毛がある
              </h1>
              <RowItems items={furItem} isRow={true} />
            </div>
            <div>
              <h1 className="w-36 text-center text-xl ml-10  mb-5  border-b-2 border-black">
                毛がある
              </h1>
              <RowItems items={furItem} isRow={true} />
            </div>
          </div>

          <div>
            <h1 className="w-36 text-center text-xl ml-10 pt-10 mb-5  border-b-2 border-black">
              毛がある
            </h1>
            <RowItems items={furItem} isRow={false} />
          </div>
        </div>
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
