<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



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

[![Product Name Screen Shot][product-screenshot]](https://example.com)

An Express Backend to Complement *add link to frontend*

### Built With

* [Node](https://nodejs.org/en/)


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



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Questions? - I'm on twitter [@calebthewood](https://twitter.com/calebthewood) - or email: calebwood.cs@gmail.com

Project Link: [https://github.com/calebthewood/personal-site](https://github.com/calebthewood/personal-site)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/calebthewood/express-jobly.svg?style=for-the-badge
[contributors-url]: https://github.com/calebthewood/express-jobly/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/calebthewood/express-jobly.svg?style=for-the-badge
[issues-url]: https://github.com/calebthewood/express-jobly/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/caleb-wood-440b37168