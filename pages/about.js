import Layout from "../src/components/Layout";

const AboutPage = () => (
  <Layout title="About">
    <div className="py-16 bg-white h-screen dark:bg-[#00561B]">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl dark:text-white">
              More about FURNITURE STORE
            </h2>
            <p className="mt-6 text-gray-600 dark:text-white">
              Welcome to our furniture store, where you'll find everything you
              need to furnish your home or office! We offer a wide range of
              high-quality furniture pieces, including sofas, armchairs, tables,
              chairs, beds, and much more. Whether you're looking for a classic,
              contemporary, or eclectic style, we have something to suit your
              taste. Our friendly and knowledgeable staff is always on hand to
              help you choose the perfect pieces for your space. We understand
              that furniture shopping can be overwhelming, so we aim to make the
              experience as easy and enjoyable as possible. If you need advice
              on colors, materials, or styles, we're here to assist you.
            </p>
            <p className="mt-4 text-gray-600 dark:text-white">
              We take pride in offering furniture of exceptional quality and
              durability. We source our materials from reputable suppliers and
              work with skilled craftsmen to ensure that our products are built
              to last. Whether you're looking for a statement piece or something
              functional and practical, you'll find it here. In addition to our
              furniture selection, we also offer a range of accessories to add
              the finishing touches to your space. From lamps and rugs to
              artwork and mirrors, we have everything you need to complete your
              home or office decor. So why wait? Visit our store today and
              discover the perfect furniture pieces for your space. We look
              forward to helping you create the home or office of your dreams!
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default AboutPage;
