<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<h3 align="center">Jobly Backend</h3>

  <p align="center">
    This is the Express backend for Jobly, version 2.
    <br />
    <a href="https://github.com/calebthewood/express-jobly/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A RESTful Node-Express backend to complement [Jobly](https://react-jobly-1.surge.sh/), my job-board app built with React. This app follows the REST architecture principals and returns JSON. Certain routes are protected vie JWT based auth middleware.

### Built With

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [JWT](https://jwt.io/)
* [JSON Schema](https://json-schema.org/)
* [Postgres](https://www.postgresql.org/)
* [PG](https://www.npmjs.com/package/pg)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Dev environment uses a local postgres database. Site is deployed with a postgres hobby db.

### Prerequisites

To run locally, install psql for Postgres
- Instructions for HomeBrew on ios
  ```sh
    $ brew install postgresql
    $ brew pin postgresql
    $ brew services start postgresql
    $ psql CREATE DATABASE jobly
  ```


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/calebthewood/express-jobly
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3.  Run in Development mode
    ```sh
    run start
    ```
4. Run Jest Tests
    ```
    run test
    ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Generate Random Password for one time use.
- [ ] Implement PostgreSQL's enum type for 'state' column
- [ ] Add technologies/skills for Jobs (many-to-many)

See the [open issues](https://github.com/calebthewood/express-jobly/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Questions? - I'm on twitter [@calebthewood](https://twitter.com/calebthewood) - or email: calebwood.cs@gmail.com

[Personal Site](https://www.calebwood.dev/)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Rithm School](https://www.rithmschool.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/calebthewood/express-jobly.svg?style=for-the-badge
[contributors-url]: https://github.com/calebthewood/express-jobly/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/calebthewood/express-jobly.svg?style=for-the-badge
[issues-url]: https://github.com/calebthewood/express-jobly/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/caleb-wood-440b37168
