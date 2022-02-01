#  basic fullstack project structure for starting a new project

This project uses [Next.js](https://nextjs.org/) as simple and performant backend with [Prisma](https://www.prisma.io/) as ORM.
[React](https://reactjs.org/) is being used as Frontend framework with [Tailwind css](https://tailwindcss.com/) for creating fast and clean user interfaces.  
For automated tests [Cypress](https://docs.cypress.io) is used as end-to-end test framework.  

## Create the structure on your own

* Install Node JS 
    * Install [Next.js](https://nextjs.org/docs/getting-started) 
    * run dev server <code>npm run dev</code> 
    * Open http://localhost:3000
* Create a database you prefer.
* Install [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-mysql)
    * Create Prisma directory in your project <code>npx prisma init</code>
    * install Prisma client<code>npm install @prisma/client</code>
        * Use <code>prisma generate</code> to generate entities from your database    
* Install [Tailwind css](https://tailwindcss.com/docs/guides/nextjs)
    * Create Tailwind directory in your project <code>npx tailwindcss init -p</code>
    * Add tailwind directive <code>@tailwind base</code> to <code>global.css</code>
* Install [Cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test)
    * Start <code>npx cypress open</code> for GUI testing
    * Run <code>npx cypress run</code> in your continuos integration script 


## Getting started

Just use <code>npm install</code> and you are ready to go :)

Open [http://localhost:3000](http://localhost:3000) with your browser to see your current page.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
Here you can app your project structure.

API documentation is taken from [Next.js](https://nextjs.org/):

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



## Author

<b>Artur Marks</b>