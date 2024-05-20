<a id="readme-top"></a>

<p align="center">
  <img src="./assets/icon.png" alt="Logo" width="250"/>
</p>

# Technologies

[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5/)
[![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)](https://webpack.js.org/)
[![D3](https://img.shields.io/badge/d3%20js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)](https://d3js.org/)
[![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)](https://babeljs.io/)

# Overview

React Query Rewind introduces a powerful DevTool extension designed to work in conjunction with React Query's built-in DevTools in order to optimize time-traveling through state changes in an application. This open-source extension is tailored to enhance the debugging experience for React Query users, allowing them to explore state changes and component relationships with ease.

# Getting Started

## Prerequisites

1. React Query installed and in use in your application.

2. Install RQRewind Chrome Extension.

   <!-- _link / picture of Extension in Chrome Store_ -->

## Installation

1.  Download npm package into your application.

    ```sh
    npm i -D react-query-rewind
    ```

2.  Import the ReactQueryRewind component into the root of your applicaiton.

    _picture of importing the component_

    ```javascript
    import ReactQueryRewind from "react-query-rewind";
    ```

3.  Place ReactQueryRewind next to the root of your application inside the QueryClientProvider component.

    ```javascript
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryRewind />
      </QueryClientProvider>
    );
    ```

4.  Open the Chrome DevTool Extension and start coding!

       <p align="left">
      <img src="https://i.imgur.com/xTEPI20.png" alt="Component Placement" width="600"/>
    </p>

# Features

- <b>Query States: </b>Upon opening RQRewind in Chrome Dev Tools, you will see the Queries tab open with a drop down menu listing the query keys of all the incoming queries. Select the queries that you want to monitor, make changes on the web app, and the changes of query states will be logged as reflected by the growing number above the play bar. Use the play bar to navigate to a particular state snapshot that you would like to inspect.

<p align="center"><img src="https://i.imgur.com/g8KrqAg.gif" width='800' style="margin-top: 1em; margin-bottom: 1em;"></p>

- <b>State Diff: </b>Toggle on the Diff button to see state changes between each snapshot highlighted. Turn on the switch on top of the page to show only parts of the state that are changed.

<p align="center"><img src="https://i.imgur.com/a8KAgXZ.gif" width='800' style="margin-top: 1em; margin-bottom: 1em;"></p>

- <b>Live UI Change: </b>As you review the state change history, there is also the option to turn on the time travel mode by clicking on the clock icon button. Under time travel mode, when visiting a logged state snapshot on RQRewindl, the UI of the app will change accordingly. Turn off time travel mode for RQRewind to continue logging future state changes.

<p align="center"><img src="https://i.imgur.com/AZ3QGuf.gif" width='800' style="margin-top: 1em; margin-bottom: 1em;"></p>

- <b>Component Tree: </b> Click on the Component Tree tab and turn on the Start Profiling switch. Click on any component on the app, and view the component tree that is rendered on the dev tools panel.

<p align="center"><img src="https://i.imgur.com/qa5UJTW.gif" width='800' style="margin-top: 1em; margin-bottom: 1em;"></p>

# Contributing

React Query Rewind values the strength of community involvement. If you're enthusiastic about React Query, time-traveling state, or improving debugging experiences, your contributions are highly appreciated. Whether it's code enhancements, documentation improvements, or innovative feature suggestions, your engagement can play a pivotal role in shaping the future of React Query Rewind. If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# Contact Information

Austin Cavanagh - [GitHub](https://github.com/austin-cavanagh) - [LinkedIn](https://www.linkedin.com/in/austincavanagh/) - austin.cavanagh.cs@gmail.com

Emma Teering - [GitHub](https://github.com/eteering) - [LinkedIn](https://www.linkedin.com/in/emma-teering/) - teeringe@gmail.com

John Dunn - [GitHub](https://github.com/johnwdunn20) - [LinkedIn](https://www.linkedin.com/in/johnwdunn/) - johnwdunn20@gmail.com

Rui Fan - [GitHub](https://github.com/ruifan-IU) - [LinkedIn](https://www.linkedin.com/in/rui-fan-868231299/) - rfan1986@gmail.com

# Links

[![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@teeringe/react-query-rewind-time-travel-debugging-made-simple-46aaeeafd497)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/react-query-rewind/)

Project Link: [React Query Rewind](https://github.com/oslabs-beta/react-query-rewind-chrome)

# License
[MIT](https://www.mit.edu/~amini/LICENSE.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>