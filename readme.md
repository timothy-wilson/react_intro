# Introduction to the React Javascript library

## Course Overview
In this course we will teach you how to take a static content website and transform it into a feature rich web application.  Anyone who is starting to explore Javascript libraries to achieve this will benefit from what is taught here.   We will take a simple website in this course and transform it through the course of the day to where it is completely rewritten in React.  In the end the content on the site will be broken into reusable components that provide dynamic content.

## 1. Setup
### Installation requirements
- VSCode, https://code.visualstudio.com/download
- NodeJS, https://nodejs.org/en/download/
- Optional - Git(hub), https://desktop.github.com/


1. Clone this github repo from https://github.com/cah-johnryan/IntroToReact
  - Open Terminal or Command prompt.
  - Change directory to where you want your work stored.  
  - Run `git clone https://github.com/cah-johnryan/IntroToReact`.

or

1. Download and decompress the zip file for the project at:
  - Download https://github.com/fusecodecamp2019/IntroToReact/archive/1.1.0.zip.
  - Decompress the contents to a directory of your choice. 
2. Open Visual Studio Code to the directory where this code is stored.
3. Open the Terminal or Command prompt pane in Visual Studio Code.
4. Run `npm install`
5. Run `npm start`
6. Open your browser of choice to http://localhost:8080/

### Installation notes (see the package.json file for your npm dependencies):
- (Core focus) React, the core library we are focusing on for this sesssion.
- react-dom, a supplemental library that helps React work with our HTML page.

- babel-cli, parts of React (JSX) won't run natively in a browser.  There are a few other Javascript feature we will use that won't run natively either.  Babel translates our Javascript files so that browsers can run our React code without issue.
- babel-preset-react-app, helps Babel with translating our React code.

- http-server, A simple http server to provide local web hosting.  (There's a lot of tools you can do this with, I am picking this as it is one I most frequently use for my own efforts)

-  concurrently, Let's us run babel as well as http-server at the same time through a single command (npm start)

## 2. Orientation
Currently http://localhost:8080/ is serving the index.html file in the root directory.  This HTML file is currently providing information on characters from the first Avengers movie.  It uses a little bit of JQuery to hide and show sections of HTML based on user's clicking in the left-hand pane.

Talking points:
- There is a decent amount of repetitive HTML for each of the characters from the movie.
- There is a sprinkling of raw Javascript that leverages JQuery to hide and show parts of the page based on user clicks.
- This page is decent for a simple example.  But if more complexity were to be added to this page it can be hard to manage using the current pattern.  If I were to have to expand this page I would start by moving the repetitive HTML into a generator in Javascript, and that is exactly something the React library is built to accomplish.

## 3. Add React to the page
This repository uses npm to download and make whatever Javascript libraries you want available.  You ran `npm install` earlier which actually downloaded the react library we need into the "node_modules" directory.  

Add the below two script tags to the index.HTML page.  These need to be added in inside the `<head>...</head>` tag for this page.
```html
  <script defer src="node_modules/react/umd/react.development.js"></script>
  <script defer src="node_modules/react-dom/umd/react-dom.development.js"></script>
```

#### A good reference point in setting up a basic page with React:
https://reactjs.org/docs/add-react-to-a-website.html

Not much of a bang here but needed for the next step...

## 4. Add your first component to the page (header)
Right-click on the page and inspect the `<header></header>` tag.  You should see highlighting for the grid being used to layout the page.  In this section we are going to move the header into a component.  The goal here is just to get you familiar with how to create and add a component to a page.

1. Create a file called "header.js" in the "\src\components\" directory (create the directory if it is not present).
2. In the new file, declare a class and called "Header" that extends the "React.Component" class that is provided by the React library.  This class needs to have a "render" function like below.
```javascript
export class Header extends React.Component {
  render() {
    return (

    );
  }
}
```
3. Move the contents of the `<header></header>` tag into the return value of of the Header.render function you created in the last step.  Make sure to leave the `<header></header>` tag on the page.
4. Note that JSX syntax does not agree with the use of the "class" attribute.  Inside your render function you will need to rename any "class" attributes to "className".
5. Add the below 2 statements at the end of the "header.js" file.
```
const headerDomContainer = document.querySelector('header');
ReactDOM.render(React.createElement(Header), headerDomContainer);
```
This finds the `<header></header>` tag via the "header CSS selector and renders your Footer component into that location in the HTML.  This is what the "react-dom" library is imported to provide.
6. Add a `<script></script>` tag to import your header component into the index.html page.  Place this script tag as the last line inside the `<header></header>` tag.
```html
<script defer type="module" src="dist/components/header.js"></script>
```
7. Verify that you still see the header on the screen when refreshing the page.

*Review what we have just done to make sure that everyone understands what is going on.*

## 5. Footer component migration (rinse and repeat)
Repeat the process from section 4 with the footer for the page just to ensure you grasp the process of creating a React component.

## 6. Character details component migration (for Bruce Banner).
For this next effort we are going to move the contents of the *first* of the `<main></main>` tags that have the "character-details-hidden" class into a new component (Bruce Banner).  When we have fully migrated this to a component we will expand this to do the same for its siblings later in this document.  

Use the same process you did with the header and footer for this effort.  

Notes:
- Don't forget the "className" attribute renaming with this step.
- The CSS selector for this component to use for component rendering is ".bruce-banner-details".
- Verify that the component renders properly on the page.  
  
## 7. Character details with data binding (for Bruce Banner).
In building the original static webpage I sourced the data from the file '/dist/data/marvel-movie-data.js'.  Import this data into the new character details component and display Bruce Banners information from that data instead as raw values.

1. Import the data file by adding the below line to the top of your character details component.
```
import { characterDataListing } from '../data/marvel-character-data.js';
```
2. Once done, add a constructor to your CharacterDetails class like below.
```javascript
  constructor(props) {
    super(props);

    // This is temporary so we can componentize this section of the page using a specific character
    this.characterName = 'Bruce Banner / Hulk';
    this.characterData = characterDataListing[this.characterName];
  }
```
3. You can then have information from the character bound to fields in the JSX.
```html
        <h2>{this.characterName}</h2>
        <p>{this.characterData.description}</p>
```
4. Verify that you still see Bruce's information properly on the screen.

*We're going to stop here and NOT introduce data binding to the actor listing or movie appearance areas of this component as this now provides the opportunity for more component extraction.*

## 8. Nesting components (actor listing)
Let's take the actor listing within the character details component and extract it into its own component.  This will almost be the same as our earlier work with the header and footer.  Then we will have the character details component use the new component.

1. Create a component file, call it "simple-listing.js".
2. Create the class for the component along with it's render function, name it "SimpleListing".
3. Copy the source HTML of the actor listing from the character details component into the render function.
(1-3 is a process you should now be familiar with.  Now for the new stuff.)

4. At the top of the character details component file import the simple listing component.
```javascript
import { SimpleListing } from './simple-listing.js';
```
5. In the render function for the character details component, replace the actor listing raw HTML with the simple listing component tag `<SimpleListing></SimpleListing>`.
6. Verify that you still see Bruce's information properly on the screen.

*Note that when creating the SimpleListing component we didn't need to add the 2 lines at the bottom of the component file to render it into the HTML file.  That is because this component is being rendered inside other React components.*

## 9. Nesting components with data binding
Let's get rid of that raw text in the HTML for the simple listing component and pass the actual data.

All React components have an object called **props** automatically setup to provide any properties that the parent might provide.  This section will leverage that to pass the data from the character details component to the simple listing component.

Also take a glance at the '/dist/data/marvel-movie-data.js' file and notice that each character has an "actors" property handily available with our needed data.

1. In the character details component, go back to that `<SimpleListing></SimpleListing>` tag.  Update that tag to have an "actors" property that will take the "actors" property from our character data.
```javascript
<SimpleListing 
  title="Actor Listing"
  listing={this.characterData.actors}>
</SimpleListing>
```
2. Now go into our simple listing component.  In the we're going take this "actors" property (this.props.actors) and make it build our JSX.
```javascript
render() {
  return (
    <div>
      <h4>{this.props.title}</h4>
      <ul>
        {
          this.props.listing.map((listItemText) => {
            return <li key={listItemText}>{listItemText}</li>
          })
        }
      </ul>
    </div>
  );
}
```
3. Verify that you still see Bruce's information properly on the screen.

#### Some documentation from React about this section that might be worth reviewing:
https://reactjs.org/docs/components-and-props.html

## 10. Component re-use (movie appearances)
Now as a means of making sure you grasp what we have done.  The character details component also has a section on movie appearances that needs to be extracted out into a nested component and passed the appropriate data bindings.  

In this section, try to re-use the simple listing component to replace the movie listing current provided.

## 11. One last component - Character listing migration
You may not realize this but we have one last component left and then the whole webpage will be in React.  So look back at the index.html file.  We are going to move the `<aside></aside>` tag into a new character listing component.  

1. Migrate the HTML for this into a new component.
*Note: this component is being injected into an HTML page, not another component.  You will need to add tell react-dom where to render this on the HTML page.  The CSS selector for this is "aside".*
2. Verify that you still see the character listing on the screen.

## 12. Go React or go home
It's that time.  We're going to move the whole page into React in this section.  Now this will have the most steps compared to earlier work so please take your time and if you get stuck reach out to a coach.

1. Create a new component called "root".
2. Open the webpage (index.html)
3. Inside the `<head></head>` tag, remove the `<script></script>` tags for all of the React components present and only have the root component injected here.
In other words:
```html
<head>
  ...

  <!-- DELETE THESE LINES -->
  <script defer type="module" src="dist/components/header.js"></script>
  <script defer type="module" src="dist/components/footer.js"></script>
  <script defer type="module" src="dist/components/character-details.js"></script>
  <script defer type="module" src="dist/components/character-listing.js"></script>

  <!-- ADD THE ROOT COMPONENT BELOW -->
  <script defer type="module" src="dist/components/root.js"></script>
</head>
```
4. Cut and paste the `<div id="root"></div>` tag from the webpage along with its contents into the new root component's render method.  Don't forget the "className" attribute renaming with this step.
5. Update the body of your webpage to have only the below content.
```html
<body>
  <div id="react-root"></div>
</body>
```
6. At the bottom of the root component file add the 2 lines needed so that react-dom can render the root component into the HTML.  The CSS selector that the Root component needs to render into is "#react-root".
7. When trying to view the page now you should see the layout with NO CONTENT...  this is fine.

## 13. Migrating the header component to be nested in the root component
1. Add the header component as an import at the top of the root component
```javascript
import { Header } from './header.js';
```
2. Insert the React `<Header></Header>` component tag inside the HTML `<header></header>` tag.
```html
<header>
  <Header></Header>
</header>
```
3. Go to the bottom of the header component file and remove the bottom 2 lines as this component is no longer being injected into the webpage but is instead to be used as a nested component (in the root component).
```javascript
const headerDomContainer = document.querySelector('header');
ReactDOM.render(React.createElement(Header), headerDomContainer);
```
4. Look at the webpage in the browser.  The header component should be right back where it was earlier.  Now we need to repeat this for the other components we have created.

## 14. Migrating all components to be nested in the root component (rinse and repeat)
Take the process in section 13 and repeat it for the footer, character listing, and character details components.

Once this is done the page should appear as it did before but is now moved entirely into React. 

*The goal of the next few sections are to make our components talk to one another so that we can move toward making this page more dynamic in what it renders to the page.*

## 15. Cut the cord with JQuery and the previous Javascript code
It's time to pull the plug by removing JQuery and the application's previous Javascript code.  After this the character selection functionality will go "lights out" so to speak until we implement this in React.

1. Inside the `<head></head>` tag of the index.html file, remove the JQuery import and the `<script></script>` tag for the Javascript that manages the static content.
```html
<head>
  ...

  <!-- DELETE THESE LINES -->
  <script src="https://code.jquery.com/jquery-3.4.0.min.js"
    integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous">
  </script>

  <script defer src="static-page.js"></script>

  ...
</head>
```

## 16. Making the character details component leverage passed properties
You might have noticed in the JSX for the root component that there is a `<main></main>` tag repeated several times.  Meanwhile, our character details component addresses the content for one of these tags.  Let's address that concern here.

1. In the character details component remove this line in the imports at the top of the file
```javascript
import { characterDataListing } from '../data/marvel-character-data.js';
```
2. Remove this section in the constructor.
```javascript
// This is temporary so we can componentize section of the page using a specific character
this.characterName = 'Bruce Banner / Hulk';
this.characterData = characterDataListing[this.characterName];
```
3. Replace "this.characterName" with "this.props.characterName".
4. Replace all instances of "this.characterData" with "this.props.characterData".
5. In the render function.  Add an if statement so that when this.props.characterName is defined it returns the current JSX.  Otherwise it should return `<div>(No selection has been made)</div>`.
```javascript
  render() {
    if (this.props.characterName) {
      return (
        ...
      );
    }
    return <div>(No selection has been made)</div>;
  }
```

## 17. Introducing state into the root component
Our root component is going to orchestrate change in the application.  To accomplish this let's introduce state here and then let the nested components bind to this information and notify the root component when there is a change.

#### Something worth covering:
https://reactjs.org/docs/state-and-lifecycle.html

1. In the character details component remove this line in the imports at the top of the file
```javascript
import { characterDataListing } from '../data/marvel-character-data.js';
```
2. In the constructor for the root component set the state object to have the 2 properties below.
```javascript
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacterName: 'Bruce Banner / Hulk',
      selectedCharacter: characterDataListing['Bruce Banner / Hulk']
    };
  }
```
3. In the JSX for the component, find all of the `<main></main>` tags and **DELETE** them.
4. For the character details component, lets add two parameters.
```javascript
<main>
  <CharacterDetails
    characterName={this.state.selectedCharacterName}
    characterData={this.state.selectedCharacter}>
  </CharacterDetails>
</main>
```
5. Verify that you now see the character listing on the screen for Bruce Banner **only**.
6. Try changing out the state manually to verfy that the character details changes appropriately.
Example
```javascript
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacterName: 'Groot',
      selectedCharacter: characterDataListing['Groot']
    };
  }
```

## 18. Update the selected character through event handling
Let's have the character listing inform the root component when the selected character changes.  This is another section that is fairly complex so please take your time and if you get stuck reach out to a coach.

#### Part 1 - Make the component use data binding
1. First, let's pass the characterData through parameters down to the character listing component.  In the root component, update the character listing component like this.
```javascript
<CharacterListing characterData={characterDataListing}></CharacterListing>
```
2. In the character listing component, let's have the listing generated dynamically from this characterData property.
```javascript
render() {
  return (
    <aside className="character-listing">
      <ul>
        {
          Object.keys(this.props.characterData).map((characterName) => {
            return <li key={characterName}>{characterName}</li>;
          })
        }
      </ul>
    </aside>
  );
}
```
3. Verify that you see a character listing that is a LOT larger than before on the page.

#### Part 2 - Have the root component handle selected character changes

#### Something worth covering:
https://reactjs.org/docs/state-and-lifecycle.html

1. In the root component, create a method to handle selected character changes and set the new state.
```javascript
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacterName: 'Groot',
      selectedCharacter: characterDataListing['Groot']
    };

    // This binding is necessary to make `this` work in the callback
    this.handleSelectedCharacterChange = this.handleSelectedCharacterChange.bind(this);
  }

  handleSelectedCharacterChange(selectedCharacterName) {
    let selectedCharacter = characterDataListing[selectedCharacterName];
    this.setState({
      selectedCharacterName: selectedCharacterName,
      selectedCharacter: selectedCharacter
    });
  }
```
2. Add this handler as a parameter on the character listing component.
```javascript
<CharacterListing 
  characterData={characterDataListing}
  onSelectedCharacterChange={this.handleSelectedCharacterChange}>
</CharacterListing>
```

**It is absolutely critical to respect state in React and only make changes where the below two rules are maintained:
1. ALWAYS change state using the setState function.
2. Every property maintained in state should have setState called against it by a single source.  The "source of truth" so to speak when it comes to that property and its value.**

#### Part 3 - Have it send notification when a character is selected.

#### Something worth covering:
https://reactjs.org/docs/handling-events.html

1. In the character listing component, create a method to handle clicks for any characters in the listing.
```javascript
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onSelectedCharacterChange(event.target.textContent);
  }
```
2. Add an onClick event handler to the list items in the render function which will call the handleClick method.
```javascript
<li key={characterName} onClick={this.handleClick}>{characterName}</li>
```
3. Now in the page, try clicking any character in the listing and see what happens.

## 19. Have the character listing highlight the selected character
One last thing to recover from the original functionality.  When a character is selected then the character name needs to be highlighted.

1. Add the selected character name as a parameter on the character listing component.  As a note, in React we only want one source of truth for state and the root component is owning who is the selected character's name in this application.
```javascript
<CharacterListing
  selectedCharacterName={this.state.selectedCharacterName}
  characterData={characterDataListing}
  onSelectedCharacterChange={this.handleSelectedCharacterChange}>
</CharacterListing>
```
2. In the render function for the selected character component, we want to add the css class "character-selected" for the selected list item.
```javascript
  render() {
    return (
      <aside className="character-listing">
        <ul>
          {
            Object.keys(this.props.characterData).map((characterName) => {
              if (characterName === this.props.selectedCharacterName) {
              return <li key={characterName} onClick={this.handleClick} className="character-selected">{characterName}</li>;
              } else {
              return <li key={characterName} onClick={this.handleClick}>{characterName}</li>;
              }
            })
          }
        </ul>
      </aside>
    );
  }
```
3. Verify that the selection highlights as appropriate.

## 20. Set the initial state to nothing selected.
1. In the root component set the properties we have in state to the value of undefined.
2. Verify that all original functionality is restored.  We are no longer "lights out" with the application when ripping out the previous Javascript logic and JQuery dependency.

## CONGRATULATIONS!
You have have fully converted the webpage completely over to React.  The HTML for the page is a single `<div></div>` tag and React is rendering only what is needed onto the page based on user actions.

... take a break for a few minutes.  I have a feature addition I would like you to try and tackle when you are ready.
# react_intro
