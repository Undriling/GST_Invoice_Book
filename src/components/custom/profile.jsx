import { motion } from "framer-motion";
import { My_Linkedin_Link, My_Resume_Link } from "../../constants/constants";
import { WorkContent } from "../../constants/socialContent";

const Profile = () => {
  const handleDownload = () => {
    const resumeUrl = My_Resume_Link;
    const newTab = window.open(resumeUrl, "_blank");
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Manash_Baruah_Resume.pdf";
      newTab.document.body.appendChild(link);
      link.click();
      newTab.document.body.removeChild(link);
    }, 1000);
  };

  return (
    <>
      <div className="flex justify-end md:hidden -mb-2 -mt-6">
        <img
          src="/logo2.jpeg"
          className="w-20 h-20 md:hidden block"
        />
      </div>
      <section className="flex flex-col items-center justify-center rounded-lg py-16 px-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white font-serif">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the Creator
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Passionate developer and tech enthusiast dedicated to building
            innovative and user-friendly web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-screen">
          <motion.div
            className="relative w-full h-80 md:h-[650px] rounded-xl overflow-hidden"
            whileHover={{ scale: 0.98 }}>
            <img
              src="/profile.svg"
              alt="Maker"
              loading="lazy"
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => window.open(My_Linkedin_Link, "_blank")}
            />
          </motion.div>

          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-semibold">
              Hello, I'm{" "}
              <span
                onClick={() => window.open(My_Linkedin_Link, "_blank")}
                className="text-[#8046FD] cursor-pointer">
                Manash Baruah
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed">
              A skilled front-end developer with a passion for crafting
              intuitive and high-performance web applications. Proficient in
              JavaScript, React.js, and Tailwind CSS, I specialize in building
              visually stunning and responsive user interfaces. With expertise
              in Firebase and Google Authentication, I create seamless
              authentication experiences and real-time data management.
              Leveraging Redux for state management and Bootstrap & Shadcn UI
              for sleek designs, I ensure efficiency and scalability in every
              project. Additionally, my knowledge of Python and Flask enables me
              to develop best solutions. Experienced in version control, I
              prioritize clean, maintainable code and continuous integration for
              streamlined development workflows. 🚀
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed">
              Always exploring new technologies and crafting high-performance
              web applications. Let's connect to discuss potential
              collaborations or share insights on the evolving landscape of
              technology...
              <br />{" "}
              <span className="text-blue-600">
                {" "}
                📧 undrilingquarter@gmail.com{" "}
              </span>
            </p>
            <button
              onClick={handleDownload}
              className="cursor-pointer px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
              My Resume
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-cyan-800">
            Highlights of My Work
          </h3>
          <hr className="border-2 m-[10px]" />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10">
          {WorkContent.map((projects, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 0.99 }}
              className="w-full md:w-full lg:w-100 h-48 md:h-70 rounded-lg overflow-hidden cursor-pointer shadow-md"
              onClick={() => window.open(projects.gitLink, "_blank")}>
              <img
                src={projects.imgSrc}
                alt={"Project " + index + 1}
                loading="lazy"
                className="w-full h-full object-fill"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
