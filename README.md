
# HoMEOWner



The live demo of the website can be accessed "here"

## Project Summary

### Project Context

HoMEOWner is a web application that is mobile responsive and enables users to adopt or rehome cats by utilizing the CRUD (Create, Read, Update, Delete) functionality. 

The app allows cat owners to create, update, and delete their cat listings if they wish to rehome their feline pets. On the other hand, potential cat owners can browse and gain information about cat adoption listings.

The app has been developed with the MERN (MongoDB, ExpressJS, React, NodeJS) stack.

### Target Audience

HoMEOWner is primarily aimed at individual cat owners who intend to rehome their cats and individuals who prefer adoption over purchasing a cat. 

Although organizations typically have their own cat adoption websites, they are invited to list their cats with HoMEOWner to increase their outreach.

### Justification for the App 

Unlike adoption websites of organizations, this web application aims to connect cat owners who wish to rehome their pets with potential cat owners who are looking for adoption. Although current cat owners may put their pets up for adoption due to specific reasons, they still care for their cats and want to entrust them to trustworthy individuals. Prospective cat owners may prefer to adopt from a cat owner instead of an organization as there is no adoption fee involved.

Furthermore, some cat adoption websites can be overly complicated and difficult for users to navigate. Hence, this web application has been designed to make it easy for users to access vital information on cats available for adoption. Users can filter cat listings based on criteria such as breed, gender, neutered status, and whether a home visit is required.

## UX/UI

### Organizational Goals

HoMEOWner is a platform that connects current and potential cat owners, providing them with an opportunity to adopt a cat and prevent it from being euthanized due to space constraints in shelters. 

The web application also raises awareness of the advantages of cat adoption, highlighting its benefits to potential cat owners.

### User Goals

Users want to know where they can hang out. The app provides the names and locations of bars, restaurants, and gyms near MRT stations. Users can also filter the places they want to go to using checkboxes between bars, restaurants, and gyms.

### User Stories

| User Story | Acceptance Criteria |
| ----------- | ----------- |
| A current cat owner who wants to rehome his cat | He wants to be able to create a cat listing in the web application |
| A current cat owner who accidentally enters the wrong cat details | He wants to be able to edit the cat listing so that the information is up-to-date and accurate |
| A potential cat owner who wants to find a certain cat or attribute | Filter search the cat listings based on the criteria user requires |
| A potential cat owner who wants to know the benefits of adopting | Every page have info to point out the benefits of adopting over buying |
| A potential cat owner who wants to know how the adoption process works | An information area that goes in detail with cat owner for private cat arrangement |

### Scope

#### Functional Requirements

- Browse all available cat listings for adoption
- Search and apply filters to cat listings based on certain criteria
- View specific details of a cat listing
- Create a new cat listing on the web application
- Edit an existing cat listing
- Delete a cat listing from the web application

#### Non-Functional Requirements

- Mobile responsiveness

#### Performance criteria:
The app should load relatively quickly.

Interactions within the app should not be too laggy, or else users may become impatient 

### Structure

All pages of the web application can be accessed via the navigation bar. The flowchart below shows how different features can be accessed:

![Web app structure](https://github.com/Alansiapk/hoMEOWner-react/blob/main/hoMEOWner_%20structure_%20diagram.png)

### Surface

**Colours**: The colour scheme incorporates a mix of light blue and dark blue, which creates a lively appearance for the cat images.

**Fonts**: 'Poppins', sans-serif font was chosen to provide a sleek and modern feel that is easy to read and visually appealing to users.

## Features

| Feature | Description |
| ----------- | ----------- |
| Search and filter | The results are displayed instantaneously as the users filter cat listings by different criterias and click the search button. |
| View full details of cat listings | User can click on each card and it will expand out to a modal that displays all the details of the cat. |
| Create new cat listing | A form with validation to enter required information to create a cat listing in the database |
| Edit cat listing | A form with validation to edit changes so that the information is up-to-date and accurate   |
| Delete cat listing | Allows current cat owners to delete their cat listings from the database after their cats are adopted. |

## Limitations & Future Implementations

| Limitation | Future Implementation |
| ----------- | ----------- |
| Other users can edit or delete the cat listings of the original creator | Create a user authentication where users can only edit or delete cat listings belonging to them |
| Browse page will become longer as more listings are created | Implement pagination to limit the number of dog listings per page |

## Technologies Used

### Frontend Framework

1. HTML5
2. CSS3
3. Javascript
4. [React](https://reactjs.org/) for frontend framework
5. [React Bootstrap](https://react-bootstrap.github.io/) for styling font
6. [Google Font]('https://fonts.googleapis.com/css2?family=Poppins&display=swap%27') for icons
7. [Axios](https://github.com/axios/axios) to communicate with ExpressJS server for CRUD (Create, Read, Update, Delete) in database

### Backend Framework

1. [ExpressJS](https://expressjs.com/) & [NodeJS](https://nodejs.org/en/) - minimalist web application framework to help manage servers and routes
2. [MongoDB & MongoDB Atlas](https://www.mongodb.com/) - manage document-oriented information, store or retrieve information

## Testing

Detailed test cases for the web application can be found [here](https://github.com/Alansiapk/hoMEOWner-react/blob/main/test_case_project2.png).

## Deployment

The web application is hosted using [Netlify](https://www.netlify.com/), deployed directly from the main branch of this GitHub repository. For the detailed deployment steps, you may refer [here]().

## Credits & Acknowledgement

- [Google Fonts](https://fonts.google.com/) for the font
- [StackOverflow](https://stackoverflow.com/) for RegEx in form validation
- [Readme.so](https://readme.so/) to generate responsive website mockup for README file
- https://jsonpathfinder.com/ for cat JSON data
