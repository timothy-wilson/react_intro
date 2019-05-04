import { Header } from "./header.js";
import { Footer } from "./footer.js";
import { Sidebar } from "./characterListing.js";
import { characterDataListing } from '../data/star-wars-character-data.js';
import { CharacterDetails } from "./charecterDetails.js"

export class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCharacterName: undefined,
            selectedCharacter: undefined
        };

        this.handleSelectedCharacterChange = this.handleSelectedCharacterChange.bind(this);
    }

    handleSelectedCharacterChange(selectedCharacterName) {
        let selectedCharacter = characterDataListing[selectedCharacterName];
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
                        characterData={characterDataListing}
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