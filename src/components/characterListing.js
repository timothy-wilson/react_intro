import React from 'react';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(event) {
        this.props.onSelectedCharacterChange(event.target.textContent);
      }
    render() {
        return (
          <aside className="character-listing">
            <ul>
              {
                Object.keys(this.props.characterData).map((characterName) => {
                    if (characterName === this.props.selectedCharacterName) {
                        return <li key={characterName} onClick={this.handleClick} className="character-selected">{characterName}</li>;
                    } else{
                        return <li key={characterName} onClick={this.handleClick}>{characterName}</li>;
                    }
                })
              }
            </ul>
          </aside>
        );
    }
}