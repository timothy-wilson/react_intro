import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { Sidebar } from "./components/characterListing.js";

import { buildDict } from "./data/fetchFacts.js";
// import { characterDataListing } from "./data/star-wars-character-data.js";

import { CharacterDetails } from "./components/characterDetails.js"

export class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characterDataListing: undefined,
            selectedCharacterName: undefined,
            selectedCharacter: undefined
        };

        buildDict().then((characterDataListing) => {
            console.log('Updating characterListing with data');

            this.setState({
                characterDataListing: characterDataListing
            })
        });

        this.handleSelectedCharacterChange = this.handleSelectedCharacterChange.bind(this);
    }

    handleSelectedCharacterChange(selectedCharacterName) {
        let selectedCharacter = this.state.characterDataListing[selectedCharacterName];
        this.setState({
            selectedCharacterName: selectedCharacterName,
            selectedCharacter: selectedCharacter
        });
    }

    render() {
        return (
            <div id="root">
                <header>
                    <Header></Header>
                </header>
                <aside className="character-listing">
                    <Sidebar
                        selectedCharacterName={this.state.selectedCharacterName}
                        characterData={this.state.characterDataListing}
                        onSelectedCharacterChange={this.handleSelectedCharacterChange}>
                    </Sidebar>
                </aside>
                <main>
                    <CharacterDetails
                        characterName={this.state.selectedCharacterName}
                        characterData={this.state.selectedCharacter}>
                    </CharacterDetails>
                </main>
                <footer>
                    <Footer></Footer>
                </footer>
            </div>
        );
    }
}

const rootDOM = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Root), rootDOM);