import React from 'react';

export class CharacterDetails extends React.Component {
    render() {
        if(this.props.characterName) {
            return(
                <div>
                    <h2>{this.props.characterName}</h2>
                    <p>height: {this.props.characterData.height}cm</p>
                    <p>weight: {this.props.characterData.mass}kg</p>
                    <p>hair color: {this.props.characterData.hair_color}</p>
                    <p>skin color: {this.props.characterData.skin_color}</p>
                    <p>eye color: {this.props.characterData.eye_color}</p>
                    <p>birth year: {this.props.characterData.birth_year}</p>
                    <p>sex: {this.props.characterData.gender}</p>
                    {/* <article>
                        <section>
                            <SimpleListing title="Trivia" listing={}></SimpleListing>
                        </section>
                        <section>
                            <SimpleListing title="Movie Apearences" listing={this.props.characterData.movies}></SimpleListing>
                        </section>
                    </article> */}
                </div>
            );
        }else {
            return(
                <div>(No selection has been made)</div>
            );
        }
    }
}