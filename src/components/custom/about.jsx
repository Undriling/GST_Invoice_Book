import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router";

const About = () => {
  return (
    <>
      <div className="flex justify-end md:hidden -mb-2 -mt-6">
        <img
          src="/logo2.jpeg"
          className="w-20 h-20 md:hidden block"
        />
      </div>
      <div className="bg-gray-50 min-h-screen rounded-lg">
        <div className="max-w-6xl mx-auto px-6 py-12 font-serif">
          <Outlet />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            About <span className="text-[#8046FD]">Mudra Bill</span>
          </h2>
          <p className="mt-4 text-gray-600 text-center text-lg max-w-3xl mx-auto">
            Your smart companion for managing GST invoices, tracking expenses,
            handling employees, and reviewing sales reports — all in one place.
          </p>

          <div className="mt-12 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/about.jpeg"
                alt="Invoice Management"
                className="rounded-xl shadow-lg"
              />
            </div>

            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800">
                Automate Billing, Track Finances, and Grow Efficiently
              </h3>
              <p className="mt-4 text-gray-600 text-lg">
                Mudra Bill is a modern GST invoicing platform built for growing
                businesses. From tracking employee salaries to monitoring your
                cash flow and generating professional invoices — we help you
                stay on top of your business finance, effortlessly. &nbsp;&nbsp;
                <Link to="profile">
                  <span className="text-[#8046FD]">
                    Click to Meet The Creator
                  </span>
                </Link>
                <br /> <span className="text-green-500">Contact Us :-</span>
                <br />
                <span className="text-blue-600">
                  {" "}
                  📧 undrilingquarter@gmail.com <br /> 📞 +91-9957352678
                </span>
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-[#8046FD] text-2xl">✔</span>
                  <p className="text-gray-700 text-lg">
                    Create & manage GST-compliant invoices
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#8046FD] text-2xl">✔</span>
                  <p className="text-gray-700 text-lg">
                    Track income, expenses & balances in real time
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#8046FD] text-2xl">✔</span>
                  <p className="text-gray-700 text-lg">
                    Manage employee data with ease
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#8046FD] text-2xl">✔</span>
                  <p className="text-gray-700 text-lg">
                    Visual sales reports & business analytics
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Simplify your billing process today.
            </h3>
            <Link to="/home">
              <Button className="w-full my-16 md:w-auto md:h-12 cursor-pointer bg-black hover:bg-gray-700 text-white font-bold transition">
                Start Using Mudra Bill — It's Free 🚀
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
