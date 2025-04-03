# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

{/* Heading */}
        <div className="justify-between">
          <img src={userData ? userData.photoURL : "../../src/assets/logo.jpeg"} alt="Logo" className="rounded-2xl w-[200px] h-[80px]"/>
          <h2>{userData.companyName}</h2>
          <h2>{userData.gstNo}</h2>
          <h2>{userData.otherTaxRegistrationNo ? userData.otherTaxRegistrationNo : ""}</h2>
          <h2>{userData.email}</h2>
          <h2>{userData.phoneNumber}</h2>
        </div>

        {/* Item List */}
        <div></div>

        {/* Bank Details */}