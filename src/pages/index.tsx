import { type NextPage } from "next";
import commerce from "../lib/commercejs";
import Head from "next/head";
import Link from "next/link";
import { Products } from "@chec/commerce.js/features/products";
import { Merchants } from "@chec/commerce.js/features/merchants";
import { Categories } from "@chec/commerce.js/features/categories";

export async function getServerSideProps() {
  const merchant = await commerce.merchants.about();

  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();
  console.log(products);
  console.log(products[0]);
  return {
    props: {
      merchant,
      categories,
      products,
    },
  };
}

// type myProps = {
//   merchant: Merchants;
//   categories: Categories;
//   products: Products[];
// };

const Home: NextPage = (props:any ) => {
  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Selected
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p>
          </div>

          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {props.products.map((myproduct: any) => {
              if (!myproduct) return null;
              return (
                <div key={myproduct.id}>
                  <a
                    href="#"
                    className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                  >
                    <img
                      src={myproduct?.image.url}
                      loading="lazy"
                      alt="Photo by Austin Wade"
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />

                    <div className="absolute left-0 bottom-2 flex gap-2">
                      <span className="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                        -50%
                      </span>
                      <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">
                        New
                      </span>
                    </div>
                  </a>

                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                      >
                        Fancy Outfit
                      </a>
                      <span className="text-gray-500">by Fancy Brand</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">
                        {myproduct.price.raw}
                      </span>
                      <span className="text-sm text-red-500 line-through">
                        $39.99
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
